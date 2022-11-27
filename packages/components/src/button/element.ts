import { property } from 'lit/decorators/property.js';
import { BaseButton, interactionStyles, baseStyles, anchorSlotStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button.js';
 * ```
 *
 * ```html
 * <bp-button>submit</bp-button>
 * ```
 *
 * @element bp-button
 * @slot Content slot for inside the button
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --min-width
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --text-align
 */
export class BpButton extends BaseButton {
  @property({ type: String, reflect: true }) action: 'primary' | 'outline' | 'flat' = 'primary';

  @property({ type: String, reflect: true }) status: 'accent' | 'success' | 'warning' | 'danger';

  static get styles() {
    return [baseStyles, interactionStyles, anchorSlotStyles, styles];
  }
}
