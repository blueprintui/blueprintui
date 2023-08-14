import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import type { Position } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
 * @element bp-chat-message
 * @since 1.0.0
 * @slot - content
 */
export class BpChatMessage extends LitElement {
  /** message type, used in bp-message-group */
  @property({ type: String, reflect: true }) type: 'sent' | 'received';

  /** base color options for multi-chat message groups */
  @property({ type: String, reflect: true }) color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';

  /** arrow position relative to the chat message */
  @property({ type: String, reflect: true }) arrow: Position;

  /** display a typing or progress spinner */
  @property({ type: Boolean }) progress: boolean;

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
