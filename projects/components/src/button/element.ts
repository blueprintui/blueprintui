import { property } from 'lit/decorators/property.js';
import {
  BaseButton,
  interactionStyles,
  baseStyles,
  anchorSlotStyles,
  BpTypeButton
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button.js';
 * ```
 *
 * ```html
 * <bp-button>submit</bp-button>
 * ```
 *
 * @summary The button component should be used when the user needs to take an action. The text or icon used in the button should be clear and concise, communicating the action the button will take.
 * @element bp-button
 * @since 1.0.0
 * @slot - button content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --padding
 * @cssprop --min-width
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --text-align
 */
export class BpButton extends BaseButton implements HTMLButtonElement, Pick<BpTypeButton, keyof BpButton> {
  @property({ type: String, reflect: true }) accessor action!: 'primary' | 'secondary' | 'flat' | 'inline';

  /** determine the visual status state */
  @property({ type: String, reflect: true }) accessor status!: 'accent' | 'success' | 'warning' | 'danger';

  static styles = [baseStyles, interactionStyles, anchorSlotStyles, styles];
}
