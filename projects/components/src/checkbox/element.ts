import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { CheckboxFormControlMixin } from '@blueprintui/components/forms';
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
export class BpCheckbox extends CheckboxFormControlMixin(LitElement) {
  static styles = [baseStyles, styles];

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
