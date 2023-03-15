import { html, LitElement, PropertyValueMap } from 'lit';
import { state } from 'lit/decorators/state.js';
import { attachInternals, baseStyles } from '@blueprintui/components/internals';
import { BpTab } from '../tab/element.js';
import styles from './element.css' assert { type: 'css' };

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
 * @slot
 * @cssprop --background
 */
export class BpTabPanel extends LitElement {
  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  @state() tab: BpTab;

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
