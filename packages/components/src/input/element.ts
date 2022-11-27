import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

export const inputStyles = styles;

/**
 * Input
 *
 * ```typescript
 * import '@blueprintui/components/include/input.js';
 * ```
 *
 * ```html
 * <bp-control>
 *   <label>input</label>
 *   <bp-input></bp-input>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-control>
 * ```
 *
 * @element bp-input
 * @slot
 * @cssprop --background-size
 * @cssprop --color
 * @cssprop --background
 * @cssprop --border
 * @cssprop --border-radius
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --width
 * @cssprop --transition
 * @cssprop --text-align
 * @cssprop --cursor
 */
export class BpInput extends FormControl {
  @property({ type: String }) type = 'text';

  @property({ type: String }) value: string | FormData = '';

  static get styles() {
    return [baseStyles, styles];
  }

  protected get prefixTemplate(): TemplateResult | null {
    return null;
  }

  protected get suffixTemplate(): TemplateResult | null {
    return null;
  }

  protected get input() {
    return this.shadowRoot.querySelector('input');
  }

  render() {
    return html`
      <div class="input-container">
        ${this.prefixTemplate}
        <slot name="prefix"></slot>
        <input input .type=${this.type} .value=${this.value as string} placeholder=${this.placeholder} size=${ifDefined(`${this.size}`)} .autocomplete=${this.autocomplete} ?required=${this.required} min=${ifDefined(this.min)} max=${ifDefined(this.max)} minlength=${ifDefined(this.minLength)} maxlength=${ifDefined(this.maxLength)} @change=${this.onChange} @input=${this.onInput} .disabled=${this.disabled || this.readonly} />
        <slot name="suffix"></slot>
        ${this.suffixTemplate}
      </div>
    `;
  }
}
