import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, attachRootNodeStyles, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' with { type: 'css' };
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/badge.js';
 * ```
 *
 * ```html
 * <bp-panel>panel content</bp-panel>
 * ```
 *
 * @summary The panel component is used to display a small amount of information, such as a count or status, in a compact and visually distinct way. It is often used to display notifications or unread messages.
 * @element bp-panel
 * @since 1.0.0
 * @slot - panel content
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
export class BpPanel extends LitElement implements Pick<BpTypeElement, keyof BpPanel> {
  static styles = [baseStyles, styles];

  /** determine the size */
  @property({ type: String, reflect: true }) accessor size: 'sm' | 'md' | 'lg';

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'region';
    this._internals.states.add('bp-layer');
    attachRootNodeStyles(this, [globalStyles]);
  }
}
