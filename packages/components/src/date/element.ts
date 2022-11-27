import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Date Input
 *
 * ```typescript
 * import '@blueprintui/components/include/date.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>time</label>
 *   <bp-date></bp-date>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @beta
 * @element bp-date
 * @slot
 */
export class BpDate extends BpInput {
  @property({ type: String, reflect: true }) type = 'date';

  get valueAsDate() {
    return this.input.valueAsDate;
  }

  set valueAsDate(value: Date) {
    this.input.valueAsDate = value;
    this.value = this.input.value;
  }

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon shape="calendar" .disabled=${this.disabled} @click=${() => this.input.showPicker()}></bp-button-icon>`;
  }
}
