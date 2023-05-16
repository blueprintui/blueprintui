import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, Position } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/chat.js';
 * ```
 *
 * ```html
 * <bp-chat-message></bp-chat-message>
 * ```
 *
 * @element bp-chat-message
 * @slot - content
 */
export class BpChatMessage extends LitElement {
  static styles = [baseStyles, styles];

  @property({ type: String, reflect: true }) color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';

  @property({ type: String, reflect: true }) arrow: Position;

  @property({ type: Boolean }) progress: boolean;

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
