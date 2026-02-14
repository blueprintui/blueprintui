import { html, LitElement } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControlMixin } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
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
 *
 * @summary The textarea component is used to capture multi-line text input from the user.
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
export class BpTextarea extends FormControlMixin(LitElement) {
  //  implements Pick<BpTypeControl, keyof BpTextarea>
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
          .defaultValue=${this.defaultValue}
          .autocomplete=${this.autocomplete}
          .disabled=${this.disabled || this.readOnly}
          ?required=${this.required}
          size=${ifDefined(`${this.size}`)}
          @change=${this._onChange}
          @input=${this._onInput}
          placeholder=${ifDefined(this.placeholder)}
          minlength=${ifDefined(this.minLength)}
          maxlength=${ifDefined(this.maxLength)}></textarea>
      </div>
    `;
  }
}
