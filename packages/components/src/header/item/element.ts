import { baseStyles, interactionStyles, BaseButton } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Header Item
 *
 * @element bp-header-item
 * @since 1.0.0
 * @slot
 */
export class BpHeaderItem extends BaseButton {
  static styles = [baseStyles, interactionStyles, styles];
}
