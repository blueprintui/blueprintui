import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { typeFormRadio, FormControl } from '@blueprintui/components/forms';
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
@typeFormRadio<BpRadio>()
export class BpRadio extends FormControl implements Pick<BpTypeControl, keyof BpRadio> {
  static styles = [baseStyles, styles];

  /** Defines the value of the radio button for form submission when selected */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** Controls the checked state of the radio button */
  @property({ type: Boolean }) accessor checked: boolean;

  /** Controls the indeterminate state of the radio button for mixed selection states */
  @property({ type: Boolean }) accessor indeterminate: boolean;

  render() {
    return html`
      <input
        type="radio"
        tabindex="-1"
        aria-hidden="true"
        .checked=${this.checked}
        .disabled=${this.disabled}
        .indeterminate=${this.indeterminate} />
    `;
  }
}
