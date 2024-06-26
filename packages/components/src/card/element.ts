import { html, LitElement } from 'lit';
import { baseStyles, attachRootNodeStyles, attachInternals, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };
import globalStyles from './element.global.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/card.js';
 * ```
 *
 * ```html
 * <bp-card>
 *   Card Content
 * </bp-card>
 * ```
 *
 * @element bp-card
 * @since 1.0.0
 * @slot - slot for card content
 * @slot header - slot for card header
 * @slot footer - slot for card footer
 * @cssprop --background
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border-radius
 * @cssprop --padding
 * @cssprop --height
 * @cssprop --width
 */
export class BpCard extends LitElement implements Pick<BpTypeElement, keyof BpCard> {
  static styles = [baseStyles, styles];

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
    attachRootNodeStyles(this.parentNode, [globalStyles]);
  }
}
