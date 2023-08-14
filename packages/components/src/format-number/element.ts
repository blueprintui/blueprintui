import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-number.js';
 * ```
 *
 * ```html
 * <bp-format-number></bp-format-number>
 * ```
 *
 * @element bp-format-number
 * @since 1.17.0
 */
@interactionTextChange()
export class BpFormatNumber extends LitElement {
  @property({ type: String }) format: 'currency' | 'decimal' | 'percent' = 'decimal';

  @property({ type: String }) currency: string;

  @property({ type: Array }) locales: string[];

  @property({ type: String, attribute: 'currency-sign' }) currencySign: 'standard' | 'accounting';

  @property({ type: String, attribute: 'currency-display' }) currencyDisplay: 'symbol' | 'code' | 'name';

  @property({ type: String, attribute: 'compact-display' }) compactDisplay: 'short' | 'long';

  @property({ type: String, attribute: 'unit-display' }) unitDisplay: 'long' | 'short' | 'narrow';

  @property({ type: String }) notation: 'standard' | 'scientific' | 'engineering' | 'compact';

  @property({ type: String, attribute: 'sign-display' }) signDisplay: 'auto' | 'never' | 'always' | 'exceptZero';

  @state() value: number = 0;

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
