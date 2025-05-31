import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import {
  attachInternals,
  baseStyles,
  BpTypeElement,
  interactionClick,
  interactionExpand,
  InteractionExpandController,
  interactionSelect,
  InteractionSelectController,
  stateExpanded,
  stateSelected,
  stopEvent,
  typeAnchor
} from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * @element bp-tree-item
 * @since 1.0.0
 * @slot - content
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --gap
 * @cssprop --height
 * @cssprop --cursor
 */
@typeAnchor<BpTreeItem>()
@stateExpanded<BpTreeItem>()
@stateSelected<BpTreeItem>()
@interactionClick<BpTreeItem>()
@interactionSelect<BpTreeItem>()
@interactionExpand<BpTreeItem>(() => ({ keynav: 'inline' }))
export class BpTreeItem extends LitElement implements Pick<BpTypeElement, keyof BpTreeItem> {
  /** indicate if a control is expanded or collapsed */
  @property({ type: Boolean }) accessor expanded: boolean;

  /** selected visual state */
  @property({ type: Boolean }) accessor selected = false;

  /** determines if node has some selected child nodes */
  @property({ type: Boolean }) accessor indeterminate = false;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  /** makes the element not mutable, meaning the user can not interact with button */
  @property({ type: Boolean }) accessor readonly: boolean;

  /** @private */
  @property({ type: String, reflect: true }) accessor selectable: 'multi' | 'single';

  /** @private */
  @state() accessor interaction: 'auto';

  get #items() {
    return this.querySelectorAll<BpTreeItem>('[slot="items"]');
  }

  declare _internals: ElementInternals;

  declare private interactionExpandController: InteractionExpandController<this>;

  declare private interactionSelectController: InteractionSelectController<this>;

  static styles = [baseStyles, styles];

  render() {
    return html`
      <div part="internal" role="presentation" class=${this.#items.length ? 'is-group' : 'is-single'}>
        <div role="presentation" class="item">
          ${this.#items.length
            ? html`<bp-button-expand
                role="presentation"
                tabindex="-1"
                @click=${this.#toggleExpand}
                size="sm"
                .checked=${this.expanded}></bp-button-expand>`
            : nothing}

          <div class="button" role="presentation">
            ${this.selectable === 'multi'
              ? html`<bp-checkbox
                  readonly
                  tabindex="-1"
                  .indeterminate=${this.indeterminate}
                  .checked=${this.selected}></bp-checkbox>`
              : nothing}
            <slot></slot>
          </div>
        </div>
        ${this.#items.length && this.expanded ? html`<slot role="group" name="items"></slot>` : nothing}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'treeitem';
    this.slot = 'items';
  }

  #toggleExpand(e: Event) {
    stopEvent(e);
    this.interactionExpandController.toggle();
  }
}
