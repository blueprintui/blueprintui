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

  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor indeterminate: boolean;

  render() {
    return html`
      <input
        type="checkbox"
        tabindex="-1"
        aria-hidden="true"
        .checked=${this.checked}
        .disabled=${this.disabled}
        .indeterminate=${this.indeterminate} />
    `;
  }
}
