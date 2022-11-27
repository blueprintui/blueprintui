import { BpButtonIcon } from '@blueprintui/components/button-icon';
import styles from './element.css' assert { type: 'css' };

/**
 * Action Handle Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button-handle.js';
 * ```
 *
 * ```html
 * <bp-button-handle></bp-button-handle>
 * ```
 *
 * @element bp-button-handle
 * @slot - For projecting text content or bp-icon
 */
export class BpButtonHandle extends BpButtonIcon {
  static get styles() {
    return [...super.styles, styles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.pressed = false;
    this.setAttribute('bp-draggable', 'handle');

    if (this.shape === 'ellipsis-vertical') {
      this.shape = 'drag-handle';
    }

    this.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        this.pressed = !this.pressed;
      }
    });
  }
}
