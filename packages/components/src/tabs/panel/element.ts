import { html, LitElement, PropertyValueMap } from 'lit';
import { state } from 'lit/decorators/state.js';
import { attachInternals, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import { BpTab } from '../tab/element.js';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tabs.js';
 * ```
 *
 * ```html
 * <bp-tab-panel></bp-tab-panel>
 * ```
 *
 * @element bp-tab-panel
 * @since 1.0.0
 * @slot
 * @cssprop --padding
 */
export class BpTabPanel extends LitElement implements Pick<BpTypeElement, keyof Omit<BpTabPanel, 'tab'>> {
  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  /** @private */
  @state() accessor tab: BpTab;

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
    this._internals.role = 'tabpanel';
    this.slot = 'tabpanel';
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);
    this.setAttribute('aria-describedby', `${this.tab?.id}`);
  }
}
