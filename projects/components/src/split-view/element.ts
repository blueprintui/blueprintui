import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/split-view.js';
 * ```
 *
 * ```html
 * <bp-split-view>
 *   <div slot="prefix">Left Panel</div>
 *   <div slot="suffix">Right Panel</div>
 * </bp-split-view>
 * ```
 *
 * @summary The split view component provides a resizable split panel layout with horizontal or vertical orientation.
 * @element bp-split-view
 * @since 2.11.0
 * @slot prefix - Left/Top panel content
 * @slot suffix - Right/Bottom panel content
 * @slot divider - Custom divider handle (optional)
 * @event {CustomEvent<{position: number}>} input - Fires during resize drag
 * @event {CustomEvent<{position: number}>} change - Fires when resize ends
 * @cssprop --divider-width - Width of the divider
 * @cssprop --divider-color - Color of the divider
 * @cssprop --divider-color-hover - Color of the divider on hover
 * @cssprop --divider-color-active - Color of the divider when active
 * @cssprop --divider-color-focus - Color of the divider when focused
 * @cssprop --divider-hit-area - Grabbable area of the divider
 */
export class BpSplitView extends LitElement {
  /** determines if the split is vertical (horizontal by default) */
  @property({ type: Boolean }) accessor vertical = false;

  /** position of the divider (percentage 0-100 or pixels) */
  @property({ type: Number }) accessor position = 50;

  /** if true, position is in pixels instead of percentage */
  @property({ type: Boolean, attribute: 'position-in-pixels' }) accessor positionInPixels = false;

  /** minimum size of prefix panel in pixels */
  @property({ type: Number, attribute: 'prefix-min' }) accessor prefixMin = 0;

  /** maximum size of prefix panel in pixels */
  @property({ type: Number, attribute: 'prefix-max' }) accessor prefixMax: number;

  /** minimum size of suffix panel in pixels */
  @property({ type: Number, attribute: 'suffix-min' }) accessor suffixMin = 0;

  /** maximum size of suffix panel in pixels */
  @property({ type: Number, attribute: 'suffix-max' }) accessor suffixMax: number;

  /** prevents resizing when true */
  @property({ type: Boolean }) accessor disabled = false;

  /** snap positions (e.g., "25 50 75") */
  @property({ type: String }) accessor snap: string;

  /** pixel distance to trigger snap */
  @property({ type: Number, attribute: 'snap-threshold' }) accessor snapThreshold = 12;

  /** aria-label for the splitter */
  @property({ type: String }) accessor label: string;

  @state() private accessor _isDragging = false;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="prefix-pane" class="prefix-pane">
        <slot name="prefix"></slot>
      </div>
      <slot name="divider">
        <bp-button-resize
          part="divider"
          .orientation=${this.vertical ? 'vertical' : 'horizontal'}
          .value=${this._getResizeValue()}
          .min=${0}
          .max=${100}
          .step=${1}
          .disabled=${this.disabled}
          .label=${this.label || `${this.vertical ? 'Vertical' : 'Horizontal'} split view divider`}
          @input=${this._handleInput}
          @change=${this._handleChange}
          @bp-touchstart=${this._handleTouchStart}
          @bp-touchend=${this._handleTouchEnd}></bp-button-resize>
      </slot>
      <div part="suffix-pane" class="suffix-pane">
        <slot name="suffix"></slot>
      </div>
    `;
  }

  /** Get current position */
  getPosition(): number {
    return this.position;
  }

  /** Set position */
  setPosition(value: number, inPixels = false): void {
    this.positionInPixels = inPixels;
    this.position = value;
  }

  private _getResizeValue(): number {
    if (this.positionInPixels) {
      // Convert pixels to percentage for the button-resize
      const containerSize = this.vertical ? this.offsetHeight : this.offsetWidth;
      return containerSize > 0 ? (this.position / containerSize) * 100 : 50;
    }
    return this.position;
  }

  private _handleInput(e: Event) {
    e.stopPropagation();
    const target = e.target as any;
    const newValue = target.value;

    let position = newValue;

    // Convert from percentage to pixels if needed
    if (this.positionInPixels) {
      const containerSize = this.vertical ? this.offsetHeight : this.offsetWidth;
      position = (newValue / 100) * containerSize;
    }

    // Apply constraints
    position = this._applyConstraints(position);

    // Apply snap
    position = this._applySnap(position);

    this.position = position;

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { position: this.position }
      })
    );
  }

  private _handleChange(e: Event) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { position: this.position }
      })
    );
  }

  private _handleTouchStart() {
    this._isDragging = true;
  }

  private _handleTouchEnd() {
    this._isDragging = false;
  }

  private _applyConstraints(position: number): number {
    const containerSize = this.vertical ? this.offsetHeight : this.offsetWidth;

    if (this.positionInPixels) {
      // Position is in pixels
      if (this.prefixMin !== undefined && position < this.prefixMin) {
        position = this.prefixMin;
      }
      if (this.prefixMax !== undefined && position > this.prefixMax) {
        position = this.prefixMax;
      }
      if (this.suffixMin !== undefined && position > containerSize - this.suffixMin) {
        position = containerSize - this.suffixMin;
      }
      if (this.suffixMax !== undefined && position < containerSize - this.suffixMax) {
        position = containerSize - this.suffixMax;
      }
    } else {
      // Position is in percentage
      const prefixMinPercent = this.prefixMin ? (this.prefixMin / containerSize) * 100 : 0;
      const prefixMaxPercent = this.prefixMax ? (this.prefixMax / containerSize) * 100 : 100;
      const suffixMinPercent = this.suffixMin ? (this.suffixMin / containerSize) * 100 : 0;
      const suffixMaxPercent = this.suffixMax ? (this.suffixMax / containerSize) * 100 : 100;

      if (prefixMinPercent && position < prefixMinPercent) {
        position = prefixMinPercent;
      }
      if (prefixMaxPercent && position > prefixMaxPercent) {
        position = prefixMaxPercent;
      }
      if (suffixMinPercent && position > 100 - suffixMinPercent) {
        position = 100 - suffixMinPercent;
      }
      if (suffixMaxPercent && position < 100 - suffixMaxPercent) {
        position = 100 - suffixMaxPercent;
      }
    }

    return position;
  }

  private _applySnap(position: number): number {
    if (!this.snap) {
      return position;
    }

    const snapPoints = this.snap
      .split(' ')
      .map(p => parseFloat(p.trim()))
      .filter(p => !isNaN(p));

    if (snapPoints.length === 0) {
      return position;
    }

    const containerSize = this.vertical ? this.offsetHeight : this.offsetWidth;
    const threshold = this.snapThreshold;

    // Convert position to pixels for snap calculation
    const positionInPixels = this.positionInPixels ? position : (position / 100) * containerSize;

    for (const snapPoint of snapPoints) {
      // Snap points are in percentage
      const snapPointInPixels = (snapPoint / 100) * containerSize;

      if (Math.abs(positionInPixels - snapPointInPixels) <= threshold) {
        // Snap to this point
        return this.positionInPixels ? snapPointInPixels : snapPoint;
      }
    }

    return position;
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (
      changedProperties.has('position') ||
      changedProperties.has('positionInPixels') ||
      changedProperties.has('vertical')
    ) {
      this._updateLayout();
    }
  }

  private _updateLayout() {
    const value = this.positionInPixels ? `${this.position}px` : `${this.position}%`;

    if (this.vertical) {
      this.style.setProperty('--prefix-size', value);
      this.style.setProperty('grid-template-rows', `var(--prefix-size) auto 1fr`);
      this.style.setProperty('grid-template-columns', '1fr');
    } else {
      this.style.setProperty('--prefix-size', value);
      this.style.setProperty('grid-template-columns', `var(--prefix-size) auto 1fr`);
      this.style.setProperty('grid-template-rows', '1fr');
    }
  }
}
