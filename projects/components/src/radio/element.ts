import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { RadioFormControlMixin } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/radio.js';
 * ```
 *
 * ```html
 * <bp-fieldset>
 *   <label>label</label>
 *
 *   <label>radio 1</label>
 *   <bp-radio value="1" checked></bp-radio>
 *
 *   <label>radio 2</label>
 *   <bp-radio value="2"></bp-radio>
 *
 *   <label>radio 3</label>
 *   <bp-radio value="3"></bp-radio>
 *
 *   <bp-field-message>message text</bp-field-message>
 * </bp-fieldset>
 * ```
 *
 * @summary Use the radio input component when you want the user to select a single option from a list of mutually exclusive options.
 * @element bp-radio
 * @since 1.0.0
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRadio extends RadioFormControlMixin(LitElement) {
  static styles = [baseStyles, styles];

  render() {
    return html` <input type="radio" tabindex="-1" inert .checked=${this.checked} .disabled=${this.disabled} /> `;
  }
}
