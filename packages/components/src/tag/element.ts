import { property } from 'lit/decorators/property.js';
import { baseStyles, interactionStyles, BaseButton, anchorSlotStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
 * @slot - badge content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --border-radius
 * @cssprop --line-height
 */
export class BpTag extends BaseButton {
  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, interactionStyles, anchorSlotStyles, styles];
}