import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  interactionStyles,
  BaseButton,
  anchorSlotStyles,
  BpTypeButton
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tag.js';
 * ```
 *
 * ```html
 * <bp-tag status="accent">item</bp-tag>
 * ```
 *
 * @element bp-tag
 * @since 1.0.0
 * @slot - badge content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --border-radius
 * @cssprop --line-height
 */
export class BpTag extends BaseButton implements Pick<BpTypeButton, keyof BpTag> {
  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, interactionStyles, anchorSlotStyles, styles];
}
