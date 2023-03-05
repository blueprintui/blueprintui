import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
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

  private _internals = this.attachInternals();

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'tablist';
    this.slot = 'tablist';
  }
}
