import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' assert { type: 'css' };

/**
 * Month Input
 *
 * ```typescript
 * import '@blueprintui/components/include/month.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>time</label>
 *   <bp-month></bp-month>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @beta
 * @element bp-month
 * @slot
 */
export class BpMonth extends BpInput {
  @property({ type: String, reflect: true }) type = 'month';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon shape="calendar" .disabled=${this.disabled} @click=${() => this.input.showPicker()}></bp-button-icon>`;
  }
}
