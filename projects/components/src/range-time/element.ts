import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { query } from 'lit/decorators/query.js';
import { baseStyles, createCustomEvent } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/range-time.js';
 * ```
 *
 * ```html
 * <bp-range-time value="30" max="120" aria-label="video progress"></bp-range-time>
 * ```
 *
 * @summary The range time component provides a specialized range slider for media playback control.
 * @element bp-range-time
 * @since 2.11.0
 * @event {InputEvent} input - occurs when the value changes while scrubbing
 * @event {Event} change - occurs when scrubbing completes
 * @event {CustomEvent} seek - occurs when user initiates a seek operation with detail.time
 * @cssprop --height - height of the track
 * @cssprop --track-background - background of unfilled track
 * @cssprop --track-color - color of filled/progress track
 * @cssprop --track-buffer-color - color of buffered sections
 * @cssprop --track-border-radius - border radius of track
 * @cssprop --thumb-size - size of the thumb (handle)
 * @cssprop --thumb-background - background color of thumb
 * @cssprop --thumb-border - border around thumb
 * @cssprop --thumb-shadow - shadow on thumb
 * @cssprop --thumb-hover-scale - scale factor for thumb on hover
 * @cssprop --tooltip-background - tooltip background color
 * @cssprop --tooltip-color - tooltip text color
 */
export class BpRangeTime extends LitElement {
  static formAssociated = true;

  /** current playback time in seconds */
  @property({ type: Number }) accessor value = 0;

  /** total duration in seconds */
  @property({ type: Number }) accessor max = 100;

  /** minimum time value */
  @property({ type: Number }) accessor min = 0;

  /** step increment in seconds */
  @property({ type: Number }) accessor step = 0.1;

  /** buffered time ranges */
  @property({ type: Array }) accessor buffered: { start: number; end: number }[] = [];

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled = false;

  /** makes the element not mutable, meaning the user can not edit the control */
  @property({ type: Boolean }) accessor readonly = false;

  /** represents the name of the current form element */
  @property({ type: String }) accessor name: string | undefined;

  @state() private accessor _isDragging = false;
  @state() private accessor _isHovering = false;
  @state() private accessor _hoverTime = 0;
  @state() private accessor _hoverPosition = 0;

  @query('[part="track"]') private accessor _trackElement: HTMLElement;

  private _internals: ElementInternals;

  static get styles() {
    return [baseStyles, styles];
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  get valueAsNumber() {
    return this.value;
  }

  set valueAsNumber(value: number) {
    this.value = value;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'slider';
    this._internals.ariaValueMin = String(this.min);
    this._internals.ariaValueMax = String(this.max);
    this._updateAriaValues();

    if (!this.disabled) {
      this.tabIndex = 0;
    }
  }

  render() {
    const progressPercent = this._getPercentage(this.value);

    return html`
      <div
        part="container"
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
        @pointerleave=${this._onPointerLeave}
        @keydown=${this._onKeyDown}>
        <div part="track" role="presentation">
          ${this._renderBufferedRanges()}
          <div part="track-fill" style="width: ${progressPercent}%" role="presentation"></div>
        </div>

        <div
          part="thumb"
          style="left: ${progressPercent}%"
          role="presentation"
          ?data-dragging=${this._isDragging}></div>

        ${this._isHovering || this._isDragging
          ? html`
              <div
                part="tooltip"
                style="left: ${this._isDragging ? progressPercent : this._hoverPosition}%"
                role="presentation">
                ${this._formatTime(this._isDragging ? this.value : this._hoverTime)}
              </div>
            `
          : ''}
      </div>
    `;
  }

  focus() {
    super.focus();
  }

  blur() {
    super.blur();
  }

  /** Updates buffered time ranges */
  setBufferedRanges(ranges: TimeRanges | { start: number; end: number }[]) {
    if (Array.isArray(ranges)) {
      this.buffered = ranges;
    } else {
      // TimeRanges object from HTML5 media
      const bufferedArray: { start: number; end: number }[] = [];
      for (let i = 0; i < ranges.length; i++) {
        bufferedArray.push({
          start: ranges.start(i),
          end: ranges.end(i)
        });
      }
      this.buffered = bufferedArray;
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('value') || changedProperties.has('max') || changedProperties.has('min')) {
      this._updateAriaValues();
      this._updateFormValue();
    }

    if (changedProperties.has('disabled')) {
      this._internals.ariaDisabled = String(this.disabled);
      this.tabIndex = this.disabled ? -1 : 0;

      if (this.disabled) {
        this._internals.states.add('disabled');
      } else {
        this._internals.states.delete('disabled');
      }
    }

    if (changedProperties.has('readonly')) {
      this._internals.ariaReadOnly = String(this.readonly);

      if (this.readonly) {
        this._internals.states.add('readonly');
      } else {
        this._internals.states.delete('readonly');
      }
    }
  }

  private _renderBufferedRanges() {
    return this.buffered.map(range => {
      const startPercent = this._getPercentage(range.start);
      const widthPercent = this._getPercentage(range.end) - startPercent;

      return html`
        <div part="track-buffer" style="left: ${startPercent}%; width: ${widthPercent}%" role="presentation"></div>
      `;
    });
  }

  private _getPercentage(value: number): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return Math.max(0, Math.min(100, ((value - this.min) / range) * 100));
  }

  private _getValueFromPosition(clientX: number): number {
    if (!this._trackElement) return this.value;

    const rect = this._trackElement.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const range = this.max - this.min;
    let value = this.min + percent * range;

    // Snap to step
    if (this.step > 0) {
      value = Math.round(value / this.step) * this.step;
    }

    return Math.max(this.min, Math.min(this.max, value));
  }

  private _onPointerDown(e: PointerEvent) {
    if (this.disabled || this.readonly) return;

    e.preventDefault();
    this._isDragging = true;
    this._isHovering = false;

    const newValue = this._getValueFromPosition(e.clientX);
    this.value = newValue;

    this._dispatchInputEvent();

    // Capture pointer to continue tracking even if cursor leaves element
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this._trackElement) return;

    const rect = this._trackElement.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));

    if (this._isDragging) {
      if (this.disabled || this.readonly) return;

      const newValue = this._getValueFromPosition(e.clientX);
      if (newValue !== this.value) {
        this.value = newValue;
        this._dispatchInputEvent();
      }
    } else {
      // Show hover tooltip
      this._isHovering = true;
      this._hoverPosition = percent;
      this._hoverTime = this._getValueFromPosition(e.clientX);
    }
  }

  private _onPointerUp(e: PointerEvent) {
    if (!this._isDragging) return;

    this._isDragging = false;

    if (!this.disabled && !this.readonly) {
      this._dispatchChangeEvent();
      this._dispatchSeekEvent();
    }

    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }

  private _onPointerLeave() {
    if (!this._isDragging) {
      this._isHovering = false;
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    let handled = false;
    let newValue = this.value;
    const range = this.max - this.min;
    const largeStep = range * 0.1; // 10% for Page Up/Down

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(this.min, this.value - this.step);
        handled = true;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(this.max, this.value + this.step);
        handled = true;
        break;
      case 'Home':
        newValue = this.min;
        handled = true;
        break;
      case 'End':
        newValue = this.max;
        handled = true;
        break;
      case 'PageUp':
        newValue = Math.min(this.max, this.value + largeStep);
        handled = true;
        break;
      case 'PageDown':
        newValue = Math.max(this.min, this.value - largeStep);
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      this.value = newValue;
      this._dispatchInputEvent();
      this._dispatchChangeEvent();
      this._dispatchSeekEvent();
    }
  }

  private _formatTime(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  }

  private _formatTimeForAria(seconds: number): string {
    const totalSeconds = Math.floor(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts: string[] = [];
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
    }
    if (minutes > 0 || hours > 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
    }
    parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);

    return parts.join(' ');
  }

  private _updateAriaValues() {
    this._internals.ariaValueNow = String(this.value);
    this._internals.ariaValueMin = String(this.min);
    this._internals.ariaValueMax = String(this.max);

    const currentTime = this._formatTimeForAria(this.value);
    const totalTime = this._formatTimeForAria(this.max);
    this._internals.ariaValueText = `${currentTime} of ${totalTime}`;
  }

  private _updateFormValue() {
    if (this.name) {
      this._internals.setFormValue(String(this.value));
    }
  }

  private _dispatchInputEvent() {
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  }

  private _dispatchChangeEvent() {
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _dispatchSeekEvent() {
    this.dispatchEvent(
      createCustomEvent('seek', {
        detail: { time: this.value }
      })
    );
  }
}
