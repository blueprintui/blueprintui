import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import type { BpButton } from '@blueprintui/components/button/element';
import type { BpButtonIcon } from '@blueprintui/components/button-icon';
import { attachRootNodeStyles, baseStyles, BpTypeElement } from '@blueprintui/components/internals';
import globalStyles from './element.global.css' with { type: 'css' };
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/button.js';
 * ```
 *
 * ```html
 * <bp-button-group>
 *   <bp-button></bp-button>
 *   <bp-button></bp-button>
 * </bp-button-group>
 * ```
 *
 * @summary The button group component is used to group together related buttons and present them as a single visual unit.
 * @element bp-button-group
 * @since 1.0.0
 * @slot - button content
 */
export class BpButtonGroup extends LitElement implements Pick<BpTypeElement, keyof BpButtonGroup> {
  @property({ type: String, reflect: true }) accessor action: 'primary' | 'secondary' | 'flat';

  @queryAssignedElements({ flatten: true, selector: 'bp-button, bp-button-icon' }) private accessor buttons: (
    | BpButton
    | BpButtonIcon
  )[] = [];

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal">
        <slot @slotchange=${this.#slotchange}></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachRootNodeStyles(this, [globalStyles]);
  }

  #slotchange() {
    this.buttons.forEach(button => (button.action = this.action));
  }
}
