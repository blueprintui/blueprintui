import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles, BpTypeElement, stateTextContent } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/badge.js';
 * ```
 *
 * ```html
 * <bp-badge status="warning">2</bp-badge>
 * ```
 *
 * @summary The badge component is used to display a small amount of information, such as a count or status, in a compact and visually distinct way. It is often used to display notifications or unread messages.
 * @element bp-badge
 * @since 1.0.0
 * @docs https://blueprintui.dev/docs/components/badge
 * @slot - badge content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --font-size
 * @cssprop --width
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --min-height
 * @cssprop --border-radius
 * @cssprop --padding
 */
@stateTextContent<BpBadge>()
export class BpBadge extends LitElement implements Pick<BpTypeElement, keyof BpBadge> {
  static styles = [baseStyles, styles];

  /** Defines the visual status type of the badge, affecting its color and semantic meaning */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'status';
  }
}
