import { baseStyles, interactionStyles, BaseButton, BpTypeButton } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Header Item
 *
 * @deprecated use "bp-button"
 * @element bp-header-item
 * @since 1.0.0
 * @slot
 */
export class BpHeaderItem extends BaseButton implements Pick<BpTypeButton, keyof BpHeaderItem> {
  static styles = [baseStyles, interactionStyles, styles];
}
