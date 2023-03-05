import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { RadioControl, typeFormRadio, FormControl } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export interface BpRadio extends RadioControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

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
 * @event {InputEvent} change - occurs when the value changes
 */
@typeFormRadio<BpRadio>()
export class BpRadio extends FormControl {
  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) value = 'on';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) indeterminate: boolean;

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
