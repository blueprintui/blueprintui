import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tabs.js';
 * ```
 *
 * ```html
 * <bp-tab-list></bp-tab-list>
 * ```
 *
 * @element bp-tab-list
 * @slot
 * @cssprop --background
 */
export class BpTabList extends LitElement {
  /** @private */
  @property({ type: String, reflect: true }) _layout: 'horizontal' | 'vertical' = 'horizontal';

  static styles = [baseStyles, styles];

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
    this._internals.role = 'tablist';
    this.slot = 'tablist';
  }
}
