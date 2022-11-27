import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { TypeFormCheckboxController, CheckboxControl, TypeFormControlController } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export interface BpCheckbox extends CheckboxControl { } // eslint-disable-line @typescript-eslint/no-empty-interface

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
 */
export class BpCheckbox extends LitElement {
  static formAssociated = true;

  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) value = 'on';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

  @property({ type: Boolean, reflect: true }) indeterminate: boolean;

  protected control = new TypeFormControlController<BpCheckbox>(this);
  protected checkbox = new TypeFormCheckboxController<BpCheckbox>(this);

  render() {
    return html`
      <input type="checkbox" tabindex="-1" aria-hidden="true" .checked=${this.checked} .disabled=${this.disabled} .indeterminate=${this.indeterminate} />
    `;
  }
}
