import { baseStyles, interactionStyles, BaseButton } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Header Item
 *
 * @element bp-header-item
 * @slot
 */
export class BpHeaderItem extends BaseButton {
  static styles = [baseStyles, interactionStyles, styles];
}
