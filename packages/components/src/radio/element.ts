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
 * @element bp-radio
 * @since 1.0.0
 * @event {InputEvent} change - occurs when the value changes
 */
@typeFormRadio<BpRadio>()
export class BpRadio extends FormControl implements Pick<BpTypeControl, keyof BpRadio> {
  static styles = [baseStyles, styles];

  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean }) accessor checked: boolean;

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
