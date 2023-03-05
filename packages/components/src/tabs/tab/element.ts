import { html, PropertyValueMap } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import { BaseButton, baseStyles, interactionStyles } from '@blueprintui/components/internals';
import { BpTabPanel } from '../panel/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tabs.js';
 * ```
 *
 * ```html
 * <bp-tab></bp-tab>
 * ```
 *
 * @element bp-tab
 * @slot
 * @cssprop --background
 */
export class BpTab extends BaseButton {
  @property({ type: Boolean, reflect: true }) selected = false;

  /** @private */
  @property({ type: String, reflect: true }) _layout: 'horizontal' | 'vertical' = 'horizontal';

  @state() tabPanel: BpTabPanel;

  static styles = [baseStyles, interactionStyles, styles];

  render() {
    return html`
      <div interaction part="internal">
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'tab';
    this._internals.ariaSelected = 'false';
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);
    this._internals.ariaSelected = `${this.selected}`;
    if (this.tabPanel) {
      this.tabPanel.hidden = !this.selected;
    }
  }
}
