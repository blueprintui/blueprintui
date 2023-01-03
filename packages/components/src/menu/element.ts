import { html, LitElement } from 'lit';
import { ariaMenu, baseStyles } from '@blueprintui/components/internals';
import { keyList } from '@blueprintui/typewriter';
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
@keyList<BpMenu>(host => ({ direction: 'all', loop: true, items: host.querySelectorAll<BpMenuItem>('bp-menu-item') }))
export class BpMenu extends LitElement {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div layer part="internal">
        <slot></slot>
      </div>
    `;
  }
}
