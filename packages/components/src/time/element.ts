import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' assert { type: 'css' };

/**
 * Time Input
 *
 * ```typescript
 * import '@blueprintui/components/include/time.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>time</label>
 *   <bp-time></bp-time>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @beta
 * @element bp-time
 * @slot
 */
export class BpTime extends BpInput {
  @property({ type: String, reflect: true }) type = 'time';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon shape="clock" .disabled=${this.disabled} @click=${() => this.input.showPicker()}></bp-button-icon>`;
  }
}
