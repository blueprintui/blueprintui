import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import type { BpTypeElement, Position } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/chat.js';
 * ```
 *
 * ```html
 * <bp-chat-group>
 *   <bp-chat-message type="sent">How are you?</bp-chat-message>
 *   <bp-chat-message type="received">Great!</bp-chat-message>
 * </bp-chat-group>
 * ```
 *
 * @summary The Chat message is a component designed to display chat messages in a conversational format. It improves readability and provides a visual context for conversations.
 * @element bp-chat-message
 * @since 1.0.0
 * @slot - content
 */
export class BpChatMessage extends LitElement implements Pick<BpTypeElement, 'type' | 'color'> {
  /** message type, used in bp-message-group */
  @property({ type: String, reflect: true }) accessor type: 'sent' | 'received';

  /** base color options for multi-chat message groups */
  @property({ type: String, reflect: true }) accessor color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';

  /** arrow position relative to the chat message */
  @property({ type: String, reflect: true }) accessor arrow: Position;

  /** display a typing or progress spinner */
  @property({ type: Boolean }) accessor progress: boolean;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        ${this.progress ? html`<bp-progress-dot size="sm"></bp-progress-dot>` : html`<slot></slot>`}
        <div part="arrow"></div>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'listitem';
  }
}
