import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles } from '@blueprintui/components/internals';
import type { BpButtonResize } from '../button-resize/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/split-view.js';
 * ```
 *
 * ```html
 * <bp-split-view>
 *   <div slot="prefix">Left/Top Panel</div>
 *   <div slot="suffix">Right/Bottom Panel</div>
 * </bp-split-view>
 * ```
 *
 * @summary A split view component that allows resizing of two panels with a draggable divider
 * @element bp-split-view
 * @since 2.11.0
 * @slot prefix - Content for the left/top panel
 * @slot suffix - Content for the right/bottom panel
 * @event {InputEvent} input - Fires during drag
 * @event {InputEvent} change - Fires on drag end
 * @cssprop --divider-width - Width of the divider
 * @cssprop --divider-color - Color of the divider
 * @cssprop --divider-color-hover - Color of the divider on hover
 * @cssprop --divider-color-active - Color of the divider when active
 * @cssprop --divider-color-focus - Color of the divider when focused
 * @cssprop --divider-hit-area - Size of the grabbable area
 */
export class BpSplitView extends LitElement {
  /** vertical orientation (horizontal by default) */
  @property({ type: Boolean }) accessor vertical = false;

  /** position in percentage (0-100) or pixels */
  @property({ type: Number }) accessor position = 50;

  /** whether position is in pixels */
  @property({ type: Boolean, attribute: 'position-in-pixels' }) accessor positionInPixels = false;

  /** minimum size for prefix panel in pixels */
  @property({ type: Number, attribute: 'prefix-min' }) accessor prefixMin = 0;

  /** maximum size for prefix panel in pixels */
  @property({ type: Number, attribute: 'prefix-max' }) accessor prefixMax: number | undefined = undefined;

  /** minimum size for suffix panel in pixels */
  @property({ type: Number, attribute: 'suffix-min' }) accessor suffixMin = 0;

  /** maximum size for suffix panel in pixels */
  @property({ type: Number, attribute: 'suffix-max' }) accessor suffixMax: number | undefined = undefined;

  /** prevents resizing */
  @property({ type: Boolean }) accessor disabled = false;

  /** snap positions (e.g., "25 50 75" or "repeat(100px)") */
  @property({ type: String }) accessor snap: string | undefined = undefined;

  /** pixel distance to trigger snap */
  @property({ type: Number, attribute: 'snap-threshold' }) accessor snapThreshold = 12;

  /** aria-label for the splitter */
  @property({ type: String }) accessor label = 'Resize panels';

  @state() private containerSize = 0;

  @state() private actualPosition = 50;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="prefix-pane" class="pane prefix" style=${this.#prefixStyle}>
        <slot name="prefix"></slot>
      </div>
      <bp-button-resize
        part="divider"
        .orientation=${this.vertical ? 'vertical' : 'horizontal'}
        .value=${this.actualPosition}
        .min=${0}
        .max=${100}
        .step=${1}
        .disabled=${this.disabled}
        aria-label=${this.label}
        @input=${this.#handleInput}
        @change=${this.#handleChange}></bp-button-resize>
      <div part="suffix-pane" class="pane suffix" style=${this.#suffixStyle}>
        <slot name="suffix"></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#updateContainerSize();
    window.addEventListener('resize', this.#handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize', this.#handleResize);
  }

  firstUpdated() {
    this.#updateContainerSize();
    this.#updatePosition(this.position);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('position') || changedProperties.has('positionInPixels')) {
      this.#updatePosition(this.position);
    }
    if (changedProperties.has('vertical')) {
      this.#updateContainerSize();
    }
  }

  /** Get current position */
  getPosition(): number {
    return this.position;
  }

  /** Set position programmatically */
  setPosition(value: number, inPixels = false): void {
    this.positionInPixels = inPixels;
    this.position = value;
  }

  get #prefixStyle() {
    const size = this.vertical ? 'height' : 'width';
    return `${size}: ${this.actualPosition}%`;
  }

  get #suffixStyle() {
    const size = this.vertical ? 'height' : 'width';
    return `${size}: ${100 - this.actualPosition}%`;
  }

  #handleResize = () => {
    this.#updateContainerSize();
    this.#updatePosition(this.position);
  };

  #updateContainerSize() {
    const rect = this.getBoundingClientRect();
    this.containerSize = this.vertical ? rect.height : rect.width;
  }

  #handleInput = (e: InputEvent) => {
    const target = e.target as BpButtonResize;
    let newPosition = target.valueAsNumber;

    // Apply constraints
    newPosition = this.#applyConstraints(newPosition);

    // Apply snap
    if (this.snap) {
      newPosition = this.#applySnap(newPosition);
    }

    this.actualPosition = newPosition;
    this.position = this.positionInPixels ? this.#percentToPixels(newPosition) : newPosition;

    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  };

  #handleChange = () => {
    this.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true }));
  };

  #updatePosition(value: number) {
    let percentValue = this.positionInPixels ? this.#pixelsToPercent(value) : value;
    percentValue = this.#applyConstraints(percentValue);
    this.actualPosition = percentValue;
  }

  #pixelsToPercent(pixels: number): number {
    if (this.containerSize === 0) return 50;
    return (pixels / this.containerSize) * 100;
  }

  #percentToPixels(percent: number): number {
    return (percent / 100) * this.containerSize;
  }

  #applyConstraints(percent: number): number {
    const pixels = this.#percentToPixels(percent);
    const suffixPixels = this.containerSize - pixels;

    let constrainedPixels = pixels;

    // Apply prefix constraints
    if (this.prefixMin > 0 && pixels < this.prefixMin) {
      constrainedPixels = this.prefixMin;
    }
    if (this.prefixMax !== undefined && pixels > this.prefixMax) {
      constrainedPixels = this.prefixMax;
    }

    // Apply suffix constraints
    if (this.suffixMin > 0 && suffixPixels < this.suffixMin) {
      constrainedPixels = this.containerSize - this.suffixMin;
    }
    if (this.suffixMax !== undefined && suffixPixels > this.suffixMax) {
      constrainedPixels = this.containerSize - this.suffixMax;
    }

    return this.#pixelsToPercent(constrainedPixels);
  }

  #applySnap(percent: number): number {
    if (!this.snap) return percent;

    const snapPoints = this.#parseSnapPoints();
    if (snapPoints.length === 0) return percent;

    // Find closest snap point
    let closestPoint = percent;
    let closestDistance = Infinity;

    for (const point of snapPoints) {
      const distance = Math.abs(percent - point);
      if (distance < closestDistance && distance <= this.#pixelsToPercent(this.snapThreshold)) {
        closestDistance = distance;
        closestPoint = point;
      }
    }

    return closestPoint;
  }

  #parseSnapPoints(): number[] {
    if (!this.snap) return [];

    // Handle "repeat(100px)" format
    const repeatMatch = this.snap.match(/repeat\((\d+)px\)/);
    if (repeatMatch) {
      const interval = parseInt(repeatMatch[1]);
      const points: number[] = [];
      for (let i = 0; i <= this.containerSize; i += interval) {
        points.push(this.#pixelsToPercent(i));
      }
      return points;
    }

    // Handle space-separated percentage values
    return this.snap
      .split(/\s+/)
      .map(s => parseFloat(s))
      .filter(n => !isNaN(n));
  }
}
