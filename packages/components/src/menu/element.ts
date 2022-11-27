import { html, LitElement } from 'lit';
import { ariaMenu, baseStyles, keyList } from '@blueprintui/components/internals';
import { BpMenuItem } from './item/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * Menu
 * 
 * ```typescript
 * import '@blueprintui/components/include/menu.js';
 * ```
 *
 * ```html
 * <bp-menu>
 * 
 * </bp-menu>
 * ```
 *
 * @element bp-menu
 * @slot - content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --width
 */
@ariaMenu<BpMenu>()
@keyList<BpMenu>(host => ({ layout: 'both', loop: true, items: host.querySelectorAll<BpMenuItem>('bp-menu-item') }))
export class BpMenu extends LitElement {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div layer class="private-host">
        <slot></slot>
      </div>
    `;
  }
}
