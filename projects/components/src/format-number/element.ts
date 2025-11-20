import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-number.js';
 * ```
 *
 * ```html
 * <bp-format-number></bp-format-number>
 * ```
 *
 * @summary The format-datetime component is used to display numbers in a human-readable format. The element reflects the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API.
 * @element bp-format-number
 * @since 1.17.0
 */
@interactionTextChange()
export class BpFormatNumber extends LitElement {
  /** Defines the number formatting style, such as currency, decimal, or percent */
  @property({ type: String }) accessor format: 'currency' | 'decimal' | 'percent' = 'decimal';

  /** Specifies the currency code to use for currency formatting */
  @property({ type: String }) accessor currency: string;

  /** Specifies the locales to use for number formatting */
  @property({ type: Array }) accessor locales: string[];

  /** Controls how to display the currency sign in accounting or standard format */
  @property({ type: String, attribute: 'currency-sign' }) accessor currencySign: 'standard' | 'accounting';

  /** Controls how the currency is displayed, as symbol, code, or name */
  @property({ type: String, attribute: 'currency-display' }) accessor currencyDisplay: 'symbol' | 'code' | 'name';

  /** Controls how compact notation displays, using short or long forms */
  @property({ type: String, attribute: 'compact-display' }) accessor compactDisplay: 'short' | 'long';

  /** Controls how units are displayed in formatted numbers */
  @property({ type: String, attribute: 'unit-display' }) accessor unitDisplay: 'long' | 'short' | 'narrow';

  /** Defines the number notation style, such as standard, scientific, or compact */
  @property({ type: String }) accessor notation: 'standard' | 'scientific' | 'engineering' | 'compact';

  /** Controls when to display the sign for positive and negative numbers */
  @property({ type: String, attribute: 'sign-display' }) accessor signDisplay:
    | 'auto'
    | 'never'
    | 'always'
    | 'exceptZero';

  @state() private accessor value: number = 0;

  static styles = [baseStyles, styles];

  get #value() {
    return new Intl.NumberFormat(this.locales, {
      style: this.currency ? 'currency' : this.format,
      notation: this.notation,
      currency: this.currency,
      currencySign: this.currencySign,
      currencyDisplay: this.currencyDisplay,
      compactDisplay: this.compactDisplay,
      unitDisplay: this.unitDisplay,
      signDisplay: this.signDisplay
    }).format(this.value);
  }

  render() {
    return html` <data value=${this.value} part="internal">${this.#value}</data> `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.value = parseFloat(this.textContent);
    this.addEventListener('bp-textchange', () => (this.value = parseFloat(this.textContent)));
  }
}
