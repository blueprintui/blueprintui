import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { attachInternals, BpTypeElement, i18n, I18nService } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/progress-bar.js';
 * ```
 *
 * ```html
 * <bp-progress-bar value="75"></bp-progress-bar>
 * ```
 *
 * @summary The progress bar component displays the progress of a task, usually on a scale from 0 to 100%. It can be used to show the progress of a download, upload, form completion, or any other process that can be represented as a percentage.
 * @element bp-progress-bar
 * @since 1.0.0
 * @cssprop --color
 */
@i18n<BpProgressBar>({ key: 'actions' })
export class BpProgressBar extends LitElement implements Pick<BpTypeElement, keyof Omit<BpProgressBar, 'min' | 'max'>> {
  /** set default aria/i18n strings */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) accessor min = 0;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) accessor max = 100;

  /** determines initial value of the control */
  @property({ type: Number }) accessor value: number | null | undefined = null;

  /** determine the visual status state */
  @property({ type: String }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <progress
          aria-hidden="true"
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          value=${ifDefined(this.value)}>
          70%
        </progress>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'progressbar';
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
      this._internals.ariaValueMin = '0';
      this._internals.ariaValueMax = '1';
      this._internals.ariaValueNow = null;
      this._internals.ariaLabel = this.i18n.loading;
    } else {
      this._internals.ariaValueMin = `${this.min}`;
      this._internals.ariaValueMax = `${this.max}`;
      this._internals.ariaValueNow = `${this.value}`;
    }
  }
}
