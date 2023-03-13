import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { CheckboxControl, typeFormCheckbox, FormControl } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export interface BpCheckbox extends CheckboxControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

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
 * @element bp-checkbox
 * @event {InputEvent} change - occurs when the value changes
 */
@typeFormCheckbox<BpCheckbox>()
export class BpCheckbox extends FormControl {
  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) value = 'on';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) indeterminate: boolean;

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
