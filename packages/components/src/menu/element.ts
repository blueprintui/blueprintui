import { html, LitElement } from 'lit';
import { ariaMenu, assignedElements, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import { keynav } from '@blueprintui/typewriter';
import { BpMenuItem } from './item/element.js';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @slot - content
 * @cssprop --background
 * @cssprop --color
 * @cssprop --width
 */
@ariaMenu<BpMenu>()
@keynav<BpMenu>((host: BpMenu) => ({ loop: true, direction: 'block', grid: host.items.map(item => [item]) }))
export class BpMenu extends LitElement implements Pick<BpTypeElement, keyof Omit<BpMenu, 'items'>> {
  static styles = [baseStyles, styles];

  get items() {
    return assignedElements<BpMenuItem>(this).filter(i => i.disabled !== true);
  }

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }
}
