import { baseStyles, interactionStyles, ariaMenuItem, anchorSlotStyles, BaseButton } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Menu Item
 *
 * @element bp-menu-item
 * @slot - content
 * @cssprop --bp-interaction-outline-offset
 * @cssprop --background
 * @cssprop --color
 * @cssprop --padding
 * @cssprop --border
 * @cssprop --border-inline
 * @cssprop --border-inline-start
 */
@ariaMenuItem<BpMenuItem>()
export class BpMenuItem extends BaseButton {
  static styles = [baseStyles, interactionStyles, anchorSlotStyles, styles];
}
