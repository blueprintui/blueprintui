import { property } from 'lit/decorators/property.js';
import { BpTypeControl, baseStyles } from '@blueprintui/components/internals';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/telephone.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>Phone Number</label>
 *   <bp-telephone placeholder="+1 (555) 123-4567"></bp-telephone>
 *   <bp-field-message>Enter your contact number</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary The telephone input component allows users to input and edit telephone numbers. Uses native `<input type="tel">` internally for proper mobile keyboard support and native validation.
 * @element bp-telephone
 * @since 2.10.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffix text or icons
 * @cssprop --background-size
 * @cssprop --color
 * @cssprop --background
 * @cssprop --border
 * @cssprop --border-radius
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --width
 * @cssprop --transition
 * @cssprop --text-align
 * @cssprop --cursor
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpTelephone extends BpInput implements Pick<BpTypeControl, keyof BpTelephone> {
  @property({ type: String }) accessor type = 'tel';

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }
}
