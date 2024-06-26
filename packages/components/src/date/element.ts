import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

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
 * @element bp-date
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpDate extends BpInput implements Pick<BpTypeControl, keyof BpDate> {
  @property({ type: String, reflect: true }) accessor type = 'date';

  get valueAsDate() {
    return this.input.valueAsDate;
  }

  set valueAsDate(value: Date) {
    this.input.valueAsDate = value;
    this.value = this.input.value;
  }

  static styles = [baseStyles, inputStyles, styles];

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="calendar"
      action="inline"
      .disabled=${this.disabled}
      @click=${this.showPicker}></bp-button-icon>`;
  }
}
