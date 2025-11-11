import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-bytes.js';
 * ```
 *
 * ```html
 * <bp-format-bytes></bp-format-bytes>
 * ```
 *
 * @summary The format-bytes component is used to display byte values in a human-readable format with automatic unit conversion (b, kb, mb, gb, tb, pb).
 * @element bp-format-bytes
 * @since 2.9.0
 */
@interactionTextChange()
export class BpFormatBytes extends LitElement {
  @property({ type: String }) accessor display: 'decimal' | 'binary' = 'decimal';

  @property({ type: String }) accessor unit: 'b' | 'kb' | 'mb' | 'gb' | 'tb' | 'pb';

  @property({ type: String, attribute: 'unit-display' }) accessor unitDisplay: 'long' | 'short' = 'short';

  @property({ type: Array }) accessor locales: string[];

  @property({ type: Number, attribute: 'minimum-fraction-digits' }) accessor minimumFractionDigits: number = 0;

  @property({ type: Number, attribute: 'maximum-fraction-digits' }) accessor maximumFractionDigits: number = 2;

  @property({ type: Number }) accessor value = 0;

  static styles = [baseStyles, styles];

  get #divisor() {
    return this.display === 'binary' ? 1024 : 1000;
  }

  get #units() {
    return {
      short: this.display === 'binary' ? ['b', 'kib', 'mib', 'gib', 'tib', 'pib'] : ['b', 'kb', 'mb', 'gb', 'tb', 'pb'],
      long: ['bytes', 'kilobytes', 'megabytes', 'gigabytes', 'terabytes', 'petabytes']
    };
  }

  get #formattedValue() {
    const bytes = this.value;

    if (bytes === 0) {
      const unit = this.#units[this.unitDisplay][0];
      return `0 ${unit}`;
    }

    const sign = bytes < 0 ? -1 : 1;
    let unitIndex = 0;
    let convertedValue = Math.abs(bytes);

    // If a specific unit is requested, convert to that unit
    if (this.unit) {
      const unitMap = { b: 0, kb: 1, mb: 2, gb: 3, tb: 4, pb: 5 };
      unitIndex = unitMap[this.unit];
      convertedValue = Math.abs(bytes) / Math.pow(this.#divisor, unitIndex);
    } else {
      // Auto-detect the appropriate unit
      while (convertedValue >= this.#divisor && unitIndex < this.#units.short.length - 1) {
        convertedValue /= this.#divisor;
        unitIndex++;
      }
    }

    const formatter = new Intl.NumberFormat(this.locales, {
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: Math.max(this.maximumFractionDigits, this.minimumFractionDigits)
    });

    const formattedNumber = formatter.format(sign * convertedValue);
    const unit = this.#units[this.unitDisplay][unitIndex];

    return `${formattedNumber} ${unit}`;
  }

  render() {
    return html` <data value=${this.value} part="internal">${this.#formattedValue}</data> `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.textContent.trim()) {
      this.value = parseFloat(this.textContent);
    }
    this.addEventListener('bp-textchange', () => (this.value = parseFloat(this.textContent)));
  }
}
