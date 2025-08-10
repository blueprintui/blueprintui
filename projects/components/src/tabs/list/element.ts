import { html, LitElement } from 'lit';
import { attachInternals, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @slot
 * @cssprop --background
 */
export class BpTabList extends LitElement implements Pick<BpTypeElement, keyof BpTabList> {
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
