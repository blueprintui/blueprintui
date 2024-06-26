import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

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
 * @element bp-month
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpMonth extends BpInput implements Pick<BpTypeControl, keyof BpMonth> {
  @property({ type: String, reflect: true }) accessor type = 'month';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="calendar"
      action="inline"
      .disabled=${this.disabled}
      @click=${this.showPicker}></bp-button-icon>`;
  }
}
