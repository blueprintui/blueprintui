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
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
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
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
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
      <div role="presentation" part="internal">
        ${this.prefixTemplate}
        <slot name="prefix"></slot>
        <input
          input
          placeholder=${this.placeholder}
          size=${ifDefined(this.size)}
          .autocomplete=${ifDefined(this.autocomplete) as string}
          ?required=${this.required}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}
          .ariaLabel=${this.composedLabel}
          .type=${this.type}
          .value=${this.value as string}
          .disabled=${this.disabled || this.readonly}
          @change=${this.onChange}
          @input=${this.onInput} />
        <slot name="suffix"></slot>
        ${this.suffixTemplate}
      </div>
    `;
  }

  protected showPicker() {
    this.input.showPicker();
  }
}
