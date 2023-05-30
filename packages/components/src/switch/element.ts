import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, interactionClick } from '@blueprintui/components/internals';
import { SwitchControl, typeFormControl, typeFormSwitch } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export interface BpSwitch extends SwitchControl {} // eslint-disable-line @typescript-eslint/no-empty-interface

/**
 * ```typescript
 * import '@blueprintui/components/include/switch.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>switch</label>
 *   <bp-switch checked></bp-switch>
 * </bp-field>
 * ```
 *
 * @element bp-switch
 * @cssprop --background
 * @cssprop --border
 * @cssprop --border-radius
 * @cssprop --height
 * @cssprop --width
 * @cssprop --anchor-background
 * @cssprop --anchor-border-radius
 * @cssprop --anchor-width
 * @cssprop --anchor-height
 * @cssprop --toggle-speed
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@typeFormControl<BpSwitch>()
@typeFormSwitch<BpSwitch>()
@interactionClick<BpSwitch>()
export class BpSwitch extends LitElement {
  static formAssociated = true;

  static styles = [baseStyles, styles];

  /** determines initial value of the control */
  @property({ type: String, reflect: true }) value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean, reflect: true }) checked: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean, reflect: true }) disabled: boolean;

  render() {
    return html` <div input></div> `;
  }
}
