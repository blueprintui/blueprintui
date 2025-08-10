import { html, LitElement } from 'lit';
import { ariaMenu, assignedElements, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import { keynav } from '@blueprintui/typewriter';
import { BpMenuItem } from './item/element.js';
import styles from './element.css' with { type: 'css' };

/**
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
 * @summary The menu component provides a hierarchical view of available options, allowing users to choose from a variety of actions. Each option should have clear, descriptive text that helps the user understand what the option does.
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
