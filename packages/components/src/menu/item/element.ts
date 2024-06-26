import {
  baseStyles,
  interactionStyles,
  ariaMenuItem,
  anchorSlotStyles,
  BaseButton,
  BpTypeButton
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Menu Item
 *
 * @element bp-menu-item
 * @since 1.0.0
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
export class BpMenuItem extends BaseButton implements Pick<BpTypeButton, keyof BpMenuItem> {
  static styles = [baseStyles, interactionStyles, anchorSlotStyles, styles];
}
