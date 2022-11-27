import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BaseButton, baseStyles } from '@blueprintui/components/internals';
import { BpNavItem } from '../item/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Button
 *
 * ```typescript
 * import '@blueprintui/components/include/nav.js';
 * ```
 *
 * ```html
 * <bp-nav-group>submit</bp-nav-group>
 * ```
 *
 * @element bp-nav-group
 * @slot
 */
export class BpNavGroup extends BaseButton {
  @property({ type: Boolean, reflect: true }) expanded = false;

  get #items() {
    return Array.from(this.querySelectorAll<BpNavItem>('bp-nav-item'));
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        <slot name="start"></slot>
        <div class="items" ?hidden=${!this.expanded} ?inert=${!this.expanded}>
          <slot @slotchange=${this.#updateItems}></slot>
        </div>
      </div>
    `;
  }

  #updateItems() {
    this.#items[0].slot = 'start';
  }
}
