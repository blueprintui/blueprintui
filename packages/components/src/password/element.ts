import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { i18n, I18nService, baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' assert { type: 'css' };

/**
 * Password
 *
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
 * @element bp-password
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@i18n<BpPassword>({ key: 'actions' })
export class BpPassword extends BpInput {
  @property({ type: String, reflect: true }) type = 'password';

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @state() private showPassword = false;

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`
      <bp-button-icon
        @click=${() => this.#togglePasswordVisibility()}
        .disabled=${this.disabled}
        .pressed=${this.showPassword}
        aria-label=${this.showPassword ? this.i18n.hide : this.i18n.show}>
        <bp-icon shape=${this.showPassword ? 'eye-hide' : 'eye'}></bp-icon>
      </bp-button-icon>
    `;
  }

  #togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
    this.input.focus();
  }
}
