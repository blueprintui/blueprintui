import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Range
 *
 * ```typescript
 * import '@blueprintui/components/include/range.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>range</label>
 *   <bp-range></bp-range>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @element bp-range
 * @slot - For projecting range input
 * @cssprop --accent-color
 * @cssprop --height
 */
 export class BpRange extends FormControl {
  @property({ type: String }) step = '1';

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        <input input type="range" value=${this.value} placeholder=${this.placeholder} .autocomplete=${this.autocomplete} .min=${this.min} .max=${this.max} .step=${this.step} @change=${(e: Event) => this.onChange(e)} @input=${(e: Event) => this.onInput(e)} .disabled=${this.disabled} />
      </div>
    `;
  }
}
