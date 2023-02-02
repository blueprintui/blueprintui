import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { SwitchControl, TypeFormControlController, TypeFormSwitchController } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export interface BpSwitch extends SwitchControl { } // eslint-disable-line @typescript-eslint/no-empty-interface

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
 */
export class BpSwitch extends LitElement {
  static formAssociated = true;

  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) value = 'on';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

  protected control = new TypeFormControlController<BpSwitch>(this);

  protected switch = new TypeFormSwitchController<BpSwitch>(this);

  render() {
    return html`
      <div input></div>
    `;
  }
}
