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
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @cssprop --accent-color
 * @cssprop --height
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
 export class BpRange extends FormControl {
  @property({ type: String }) step = '1';

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <input input .ariaLabel=${this.composedLabel} type="range" value=${this.value} placeholder=${this.placeholder} .autocomplete=${this.autocomplete} .min=${this.min} .max=${this.max} .step=${this.step} @change=${(e: Event) => this.onChange(e)} @input=${(e: Event) => this.onInput(e)} .disabled=${this.disabled} />
      </div>
    `;
  }
}
