import '@blueprintui/components/include/button-expand.js';
import '@blueprintui/components/include/checkbox.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpTree, BpTreeItem } from '@blueprintui/components/tree';

defineElement('bp-tree', BpTree);
defineElement('bp-tree-item', BpTreeItem);

declare global {
  interface HTMLElementTagNameMap {
    'bp-tree': BpTree;
    'bp-tree-item': BpTreeItem;
  }
}
