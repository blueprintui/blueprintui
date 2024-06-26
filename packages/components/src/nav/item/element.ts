import { html } from 'lit';
import { baseStyles, interactionStyles, BaseButton } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * Nav Item
 *
 * @element bp-nav-item
 * @since 1.0.0
 * @slot - content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --border
 * @cssprop --border-left
 */
export class BpNavItem extends BaseButton {
  static styles = [baseStyles, interactionStyles, styles];

  get #icons() {
    return this.querySelectorAll('bp-icon');
  }

  render() {
    return html`<div interaction part="internal">
      <slot name="icon"></slot><slot default @slotchange=${this.#updateSlots}></slot>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'treeitem';
  }

  #updateSlots() {
    this.#icons.forEach(i => (i.slot = 'icon'));
  }
}
