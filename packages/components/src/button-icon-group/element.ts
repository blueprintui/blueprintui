import { html, LitElement } from 'lit';
import { keynav } from '@blueprintui/typewriter';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { assignedElements, baseStyles } from '@blueprintui/components/internals';
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
 * @since 1.0.0
 * @slot - slot for bp-icon
 * @cssprop --border
 * @cssprop --border-radius
 */
@keynav<BpButtonIconGroup>(host => ({ grid: [host.buttons], loop: true }))
export class BpButtonIconGroup extends LitElement {
  static get styles() {
    return [baseStyles, styles];
  }

  get buttons() {
    return assignedElements<BpButtonIcon>(this);
  }

  render() {
    return html`
      <div part="internal">
        <slot></slot>
      </div>
    `;
  }
}
