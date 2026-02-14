import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { CheckboxFormControlMixin } from '@blueprintui/components/forms';
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
 * @summary Use the switch input component for boolean-like options, such as enabling/disabling notifications, or for settings that can be toggled between two states.
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
export class BpSwitch extends CheckboxFormControlMixin(LitElement) {
  static styles = [baseStyles, styles];

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'switch';
  }

  render() {
    return html`<div input></div>`;
  }
}
