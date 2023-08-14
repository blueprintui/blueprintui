import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '@blueprintui/typewriter';
import {
  typeMultiSelectable,
  attachInternals,
  baseStyles,
  getFlattenedFocusableItems,
  selectionStates
} from '@blueprintui/components/internals';
import type { BpTreeItem } from './item/element.js';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/tree.js';
 * ```
 *
 * ```html
 * <bp-tree></bp-tree>
 * ```
 *
 * @element bp-tree
 * @since 1.0.0
 * @slot - tree items
 * @cssprop --background
 */
@keynav<BpTree>(host => ({ direction: 'block', grid: host.openItems.map(item => [item]) }))
@typeMultiSelectable<BpTree>()
export class BpTree extends LitElement {
  /** indicate if a control is expanded or collapsed */
  @property({ type: String, reflect: true }) interaction?: 'auto';

  /** determine if tree items can be selected */
  @property({ type: String }) selectable: 'multi' | 'single';

  /** @private */
  get openItems() {
    return getFlattenedFocusableItems(this).filter((i: any) => i.tagName === 'BP-TREE-ITEM') as BpTreeItem[];
  }

  get #items() {
    return getFlattenedFocusableItems(this).filter((i: any) => i.tagName === 'BP-TREE-ITEM') as BpTreeItem[];
  }

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <div part="internal">
        <slot name="items" @slotchange=${this.#slotchange}></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'tree';

    this.addEventListener('click', (e: any) => {
      if (this.interaction === 'auto' && e.target.tagName === 'BP-TREE-ITEM') {
        const item = e.target as BpTreeItem;
        const items = Array.from(item.querySelectorAll<BpTreeItem>('[slot="items"]'));

        if (this.selectable === 'multi') {
          item.selected = !item.selected;
          items.forEach(i => {
            i.selected = item.selected;
            i.indeterminate = false;
          });
        }

        if (this.selectable === 'single') {
          item.selected = !item.selected;
          this.#items.filter(i => i !== item).forEach(i => (i.selected = false));
        }

        this.#items.forEach(item => updateSelection(item));
      }
    });
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);

    if (props.has('selectable') || props.has('interaction')) {
      this.#slotchange();
    }
  }

  #slotchange() {
    this.#items.forEach(item => {
      item.selectable = this.selectable;
      item.interaction = this.interaction;
    });
  }
}

export function updateSelection(item: BpTreeItem) {
  const items = Array.from(item.querySelectorAll<BpTreeItem>('[slot="items"]'));

  if (items.length) {
    const { allSelected, anySelected, noneSelected } = selectionStates(items);
    if (allSelected) {
      item.selected = true;
      item.indeterminate = false;
    } else if (anySelected) {
      item.indeterminate = true;
    } else if (noneSelected) {
      item.selected = false;
      item.indeterminate = false;
    }
  }

  items.forEach(item => updateSelection(item));
}
