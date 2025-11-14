import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/avatar.js';
 * ```
 *
 * ```html
 * <bp-avatar aria-label="User avatar">
 *   <bp-icon shape="user" type="solid"></bp-icon>
 * </bp-avatar>
 * ```
 *
 * @summary The avatar component is used to represent a user or entity with an image, icon, or initials
 * @element bp-avatar
 * @since 2.9.0
 * @slot - Content to display - text for initials, img for image, or icon for custom icon
 * @cssprop --size - Size of the avatar (default: var(--bp-size-900))
 * @cssprop --background - Background color
 * @cssprop --color - Text/icon color
 * @cssprop --border-radius - Border radius (controlled by shape attribute)
 * @csspart internal - The container wrapping the avatar content
 */
export class BpAvatar extends LitElement {
  static styles = [baseStyles, styles];

  /** determine the visual shape of the avatar */
  @property({ type: String, reflect: true }) accessor shape: 'square' | 'rounded';

  /** optional status indicator color */
  @property({ type: String, reflect: true }) accessor status: 'accent' | 'success' | 'warning' | 'danger';

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot>
          ${this.status ? html`<bp-badge .status=${this.status}></bp-badge>` : nothing}
          <bp-icon shape="user" type="solid"></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'img';
  }
}
