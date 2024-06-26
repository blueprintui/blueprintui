import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControl } from '@blueprintui/components/forms';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Form
 *
 * ```typescript
 * import '@blueprintui/components/include/textarea.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>textarea</label>
 *   <bp-textarea></bp-textarea>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 * @element bp-textarea
 * @since 1.0.0
 * @cssprop --background
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --color
 * @cssprop --border-radius
 * @cssprop --min-height
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpTextarea extends FormControl implements Pick<BpTypeControl, keyof BpTextarea> {
  @property({ type: String }) accessor value: string | FormData = '';

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <textarea
          input
          .ariaLabel=${this.composedLabel}
          .value=${this.value}
          .autocomplete=${this.autocomplete}
          .disabled=${this.disabled || this.readonly}
          ?required=${this.required}
          size=${ifDefined(`${this.size}`)}
          @change=${this.onChange}
          @input=${this.onInput}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}></textarea>
      </div>
    `;
  }
}
