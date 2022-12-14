import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, layerStyles, elevationStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

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
 * @slot - card content
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

  private _internals = this.attachInternals();

  render() {
    return html`
      <div elevation layer part="internal">
        <slot name="header"></slot>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'region';
    this.setAttribute('bp-theme', 'layer');
  }
}
