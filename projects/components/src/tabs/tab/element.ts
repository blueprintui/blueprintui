import { html, PropertyValueMap } from 'lit';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import {
  BaseButton,
  baseStyles,
  BpTypeButton,
  interactionSelect,
  interactionStyles,
  stateSelected
} from '@blueprintui/components/internals';
import type { BpTabPanel } from '../panel/element.js';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @slot
 * @cssprop --background
 */
@stateSelected<BpTab>()
@interactionSelect<BpTab>()
export class BpTab extends BaseButton implements Pick<BpTypeButton, keyof Omit<BpTab, 'tabPanel'>> {
  /** selected visual state */
  @property({ type: Boolean, reflect: true }) accessor selected = false;

  @state() accessor tabPanel: BpTabPanel;

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
  }

  protected updated(props: PropertyValueMap<this>) {
    super.updated(props);
    if (this.tabPanel) {
      this.tabPanel.hidden = !this.selected;
    }
  }
}
