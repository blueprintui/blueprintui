import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, BpTypeControl, interactionClick } from '@blueprintui/components/internals';
import { FormControl, typeFormSwitch } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
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
@typeFormSwitch<BpSwitch>()
@interactionClick<BpSwitch>()
export class BpSwitch extends FormControl implements Pick<BpTypeControl, keyof BpSwitch> {
  /** determines initial value of the control */
  @property({ type: String, reflect: true }) accessor value = 'on';

  /** determines whether element is checked */
  @property({ type: Boolean }) accessor checked: boolean;

  static formAssociated = true;

  static styles = [baseStyles, styles];

  render() {
    return html` <div input></div> `;
  }
}
