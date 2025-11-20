import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, BpTypeElement, i18n, I18nService } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/progress-circle.js';
 * ```
 *
 * ```html
 * <bp-progress-circle value="75"></bp-progress-circle>
 * ```
 *
 * @summary The progress circle component displays a visual representation of progress in the form of a circle. It is useful for showing the progress of a task in a compact, easy-to-understand manner.
 * @element bp-progress-circle
 * @since 1.0.0
 * @cssprop --ring-opacity
 * @cssprop --ring-color
 * @cssprop --fill-color
 * @cssprop --fill-speed
 * @cssprop --size
 */
@i18n<BpProgressCircle>({ key: 'actions' })
export class BpProgressCircle extends LitElement implements Pick<BpTypeElement, keyof Omit<BpProgressCircle, 'line'>> {
  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Defines the visual status type affecting color and semantic meaning */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  /** Defines the current progress value from 0 to 100 */
  @property({ type: Number }) accessor value: number;

  /** Controls the stroke width of the progress circle ring */
  @property({ type: Number }) accessor line = 3;

  /** Determines the size variant of the component for different visual hierarchies */
  @property({ type: String }) accessor size: 'sm' | 'md' | 'lg';

  get #radius() {
    return 18 - Math.ceil(this.line / 2);
  }

  get #circumference() {
    return 2 * Math.PI * this.#radius;
  }

  get #progress() {
    return this.value ?? 30;
  }

  get #progressOffset() {
    return ((100 - this.#progress) / 100) * this.#circumference;
  }

  static styles = [styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal" aria-hidden="true">
        <div class="progress-wrapper">
          <svg
            version="1.1"
            viewBox="0 0 36 36"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            focusable="false">
            <circle
              stroke-width=${this.line}
              r=${this.#radius}
              class=${this.#progress > 99 ? 'arcstroke' : 'backstroke'}
              fill="none"
              cx="18"
              cy="18" />
            <path
              d="M 18 18 m 0,-${this.#radius} a ${this.#radius},${this.#radius} 0 1 1 0,${2 * this.#radius} a ${this
                .#radius},${this.#radius} 0 1 1 0,-${2 * this.#radius}"
              stroke-width=${this.line}
              stroke-dasharray=${this.#circumference}
              stroke-dashoffset=${this.#progressOffset}
              class="fillstroke arcstroke"
              fill="none" />
          </svg>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'progressbar';
    this._internals.ariaValueMin = '0';
    this.#updateAria();
  }

  protected updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('value')) {
      this.#updateAria();
    }
  }

  #updateAria() {
    if (this.value === undefined || this.value === null) {
      this._internals.ariaValueMax = '1';
      this._internals.ariaValueNow = null;
      this._internals.ariaLabel = this.i18n.loading;
    } else {
      this._internals.ariaValueMax = '100';
      this._internals.ariaValueNow = `${this.value}`;
    }
  }
}
