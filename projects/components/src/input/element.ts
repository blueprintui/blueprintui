import { html, TemplateResult } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles, BpTypeControl } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

export const inputStyles = styles;

/**
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
 * @summary The text input component is used to allow users to input and edit text. The text input should have a clear, descriptive label that explains what the user should enter as well as a placeholder text that gives an example of the expected input format.
 * @element bp-input
 * @since 1.0.0
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
export class BpInput extends FormControl implements Pick<BpTypeControl, keyof BpInput> {
  /** Specifies the input type, affecting behavior and validation */
  @property({ type: String }) accessor type = 'text';

  /** Defines the current value of the input for form submission and validation */
  @property({ type: String }) accessor value: string | FormData = '';

  static styles = [baseStyles, styles];

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
