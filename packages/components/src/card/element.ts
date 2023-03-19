import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  layerStyles,
  elevationStyles,
  attachRootNodeStyles,
  attachInternals
} from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };
import globalStyles from './element.global.css' assert { type: 'css' };

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
export class BpCard extends LitElement {
  @property({ type: String, reflect: true }) elevation: 'raised' | 'flat';

  static styles = [baseStyles, layerStyles, elevationStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div elevation part="internal">
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
    this.setAttribute('bp-theme', 'layer');
    attachRootNodeStyles(this.parentNode, [globalStyles]);
  }
}
