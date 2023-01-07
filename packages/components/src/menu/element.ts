import { html, LitElement } from 'lit';
import { ariaMenu, baseStyles } from '@blueprintui/components/internals';
import { keynav } from '@blueprintui/typewriter';
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
@keynav<BpMenu>(host => ({ loop: true, direction: 'block', grid: host.items.map(item => [item]) }))
export class BpMenu extends LitElement {
  static styles = [baseStyles, styles];

  get items() {
    return Array.from(this.querySelectorAll<BpMenuItem>('bp-menu-item')).filter((i: any) => i.disabled !== true);
  }

  render() {
    return html`
      <div layer part="internal">
        <slot></slot>
      </div>
    `;
  }
}
