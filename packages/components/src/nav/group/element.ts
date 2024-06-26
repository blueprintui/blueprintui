import { LitElement, PropertyValues, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  InteractionExpandController,
  baseStyles,
  interactionExpand,
  stateExpanded
} from '@blueprintui/components/internals';
import { BpNavItem } from '../item/element.js';
import styles from './element.css' with { type: 'css' };

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
 * @since 1.0.0
 * @event open - when element is expanded
 * @event close - when element is collapsed
 * @slot - bp-nav-item elements
 */
@stateExpanded<BpNavGroup>()
@interactionExpand<BpNavGroup>()
export class BpNavGroup extends LitElement {
  /** determine if element is expanded */
  @property({ type: Boolean }) accessor expanded = false;

  /** determine if element should auto manage expanded state */
  @property({ type: String }) accessor interaction: 'auto';

  static styles = [baseStyles, styles];

  get #items() {
    return Array.from(this.querySelectorAll<BpNavItem>('bp-nav-item'));
  }

  /** @private */
  declare interactionExpandController: InteractionExpandController<this>;

  /** @private */
  declare _internals?: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot name="start"></slot>
        <div role="group" ?hidden=${!this.expanded} ?inert=${!this.expanded}>
          <slot @slotchange=${this.#updateItems}></slot>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'treeitem';
    this._internals.ariaExpanded = 'false';
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this._internals.ariaExpanded = `${this.expanded}`;
  }

  #toggle() {
    if (this.expanded) {
      this.interactionExpandController.close();
    } else {
      this.interactionExpandController.open();
    }
  }

  #updateItems() {
    if (this.#items[0].slot !== 'start') {
      this.#items[0].addEventListener('click', () => this.#toggle());
      this.#items[0].slot = 'start';
    }
  }
}
