import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BaseButton, BpTypeButton, baseStyles, interactionStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button-handle.js';
 * ```
 *
 * ```html
 * <bp-button-handle></bp-button-handle>
 * ```
 *
 * @summary The button handle component is used to act as a handle to drag and move an element, such as a slidebar or a modal window.
 * @element bp-button-handle
 * @since 1.0.0
 * @slot - slot for text content or bp-icon
 * @cssprop --cursoe
 * @cssprop --icon-width
 * @cssprop --icon-height
 */
export class BpButtonHandle
  extends BaseButton
  implements Pick<BpTypeButton, keyof Omit<BpButtonHandle, 'shape' | 'icon'>>
{
  /** Defines the icon shape used for the drag handle visual indicator */
  @property({ type: String }) accessor shape = 'drag-handle';

  /** Controls the directional orientation of the drag handle icon */
  @property({ type: String, reflect: true }) accessor direction: 'up' | 'down' | 'left' | 'right';

  static get styles() {
    return [baseStyles, interactionStyles, styles];
  }

  render() {
    return html`
      <div part="internal" interaction-after>
        <slot>
          <bp-icon
            part="icon"
            .direction=${this.direction}
            .shape=${this.shape}
            .type=${this.pressed || this.expanded ? 'solid' : ''}
            size="lg"></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.pressed = false;
    this.setAttribute('bp-draggable', 'handle');

    this.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        this.pressed = !this.pressed;
      }
    });
  }
}
