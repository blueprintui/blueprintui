import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { i18n, I18nService, baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/password.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>password</label>
 *   <bp-password></bp-password>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary The password input component is used to accept password input from users. It is a text input field with a toggle button to show or hide the password.
 * @element bp-password
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@i18n<BpPassword>({ key: 'actions' })
export class BpPassword extends BpInput {
  //  implements Pick<BpTypeControl, keyof BpPassword>
  /** Specifies the input type as password for secure text entry */
  @property({ type: String, reflect: true }) accessor type = 'password';

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  @state() private accessor showPassword = false;

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`
      <bp-button-icon
        action="inline"
        @click=${this.#togglePasswordVisibility}
        .disabled=${this.disabled}
        .pressed=${this.showPassword}
        aria-label=${this.showPassword ? this.i18n.hide : this.i18n.show}>
        <bp-icon shape=${this.showPassword ? 'eye-hide' : 'eye'}></bp-icon>
      </bp-button-icon>
    `;
  }

  #togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    // native mutation behavior
    this.type = this.showPassword ? 'text' : 'password';
    this.input.focus();
  }
}
