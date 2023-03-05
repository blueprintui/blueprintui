import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { i18n, I18nService } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/progress-circle.js';
 * ```
 *
 * ```html
 * <bp-progress-circle value="75"></bp-progress-circle>
 * ```
 *
 * @element bp-progress-circle
 * @cssprop --ring-opacity
 * @cssprop --ring-color
 * @cssprop --fill-color
 * @cssprop --fill-speed
 * @cssprop --size
 */
@i18n<BpProgressCircle>({ key: 'actions' })
export class BpProgressCircle extends LitElement {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  @property({ type: Number }) value: number;

  @property({ type: Number }) line = 3;

  static get properties() {
    return {
      size: { type: String, reflect: true }
    };
  }

  #size: string;

  set size(val: string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl') {
    if (val !== this.#size) {
      const oldVal = this.#size;
      this.#size = val;
      this.style.width = val;
      this.style.height = val;
      this.requestUpdate('size', oldVal);
    }
  }

  get size() {
    return this.#size;
  }

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

  private _internals = this.attachInternals();

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
              stroke-width="${this.line}"
              r="${this.#radius}"
              class="${this.#progress > 99 ? 'arcstroke' : 'backstroke'}"
              fill="none"
              cx="18"
              cy="18" />
            <path
              d="M 18 18 m 0,-${this.#radius} a ${this.#radius},${this.#radius} 0 1 1 0,${2 * this.#radius} a ${this
                .#radius},${this.#radius} 0 1 1 0,-${2 * this.#radius}"
              stroke-width="${this.line}"
              stroke-dasharray="${this.#circumference}"
              stroke-dashoffset="${this.#progressOffset}"
              class="fillstroke arcstroke"
              fill="none" />
          </svg>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
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
