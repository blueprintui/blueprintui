import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, i18n, I18nService } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

/**
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
 * @summary The time input component is used to collect a specific time value from the user. It can be used as a standalone component or as part of a form.
 * @element bp-time
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @slot - slot for time input
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@i18n<BpTime>({ key: 'actions' })
export class BpTime extends BpInput {
  // implements Pick<BpTypeControl, keyof BpTime>
  /** Specifies the input type as time for time selection */
  @property({ type: String }) accessor type = 'time';

  /** Provides internationalization strings for translated text content */
  @property({ type: Object }) accessor i18n = I18nService.keys.actions;

  /** Override min to preserve string time values (HH:MM format) */
  override get min(): string | null {
    return this.getAttribute('min');
  }

  override set min(value: string | number | null) {
    if (value !== null) {
      this.setAttribute('min', value.toString());
    } else {
      this.removeAttribute('min');
    }
  }

  /** Override max to preserve string time values (HH:MM format) */
  override get max(): string | null {
    return this.getAttribute('max');
  }

  override set max(value: string | number | null) {
    if (value !== null) {
      this.setAttribute('max', value.toString());
    } else {
      this.removeAttribute('max');
    }
  }

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  protected get suffixTemplate() {
    return html`<bp-button-icon
      shape="clock"
      action="inline"
      .disabled=${this.disabled}
      @click=${this.showPicker}
      aria-label=${this.i18n.expand}></bp-button-icon>`;
  }
}
