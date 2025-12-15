import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { typeFormCheckbox, FormControl } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/checkbox.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>checkbox</label>
 *   <bp-checkbox checked></bp-checkbox>
 * </bp-field>
 * ```
 *
 * @summary Checkboxes are used to select one or more options from a list. They are not intended for lists where only one option can be selected. Each checkbox can be selected independently of the others.
 * @element bp-checkbox
 * @since 1.0.0
 * @event {InputEvent} change - occurs when the value changes
 */
@typeFormCheckbox<BpCheckbox>()
export class BpCheckbox extends FormControl implements Pick<BpTypeControl, keyof BpCheckbox> {
  static styles = [baseStyles, styles];

  /** Defines the value of the control when used in forms, submitted when the checkbox is checked */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** Controls the checked state of the checkbox */
  @property({ type: Boolean }) accessor checked: boolean;

  /** Controls the indeterminate state, displaying a dash when neither fully checked nor unchecked */
  @property({ type: Boolean }) accessor indeterminate: boolean;

  render() {
    return html`
      <input
        type="checkbox"
        tabindex="-1"
        inert
        .checked=${this.checked}
        .disabled=${this.disabled}
        .indeterminate=${this.indeterminate} />
    `;
  }
}
