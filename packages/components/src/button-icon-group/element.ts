import { html, LitElement } from 'lit';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { baseStyles, keyList } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Button
 *
 * ```typescript
 * import '@blueprintui/components/include/button-icon-group.js';
 * ```
 *
 * ```html
 * <bp-button-icon-group>
 *   <bp-button-icon shape="font-size" aria-label="font size"></bp-button-icon>
 *   <bp-button-icon selected shape="italic" aria-label="italic"></bp-button-icon>
 *   <bp-button-icon disabled shape="number-list" aria-label="number list"></bp-button-icon>
 * </bp-button-icon-group>
 * ```
 *
 * @element bp-button-icon-group
 * @slot
 * @cssprop --border
 * @cssprop --border-radius
 */
@keyList<BpButtonIconGroup>(host => ({ items: host.buttons }))
export class BpButtonIconGroup extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  get buttons() {
    return Array.from(this.querySelectorAll<BpButtonIcon>('bp-button-icon'));
  }

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }
}
