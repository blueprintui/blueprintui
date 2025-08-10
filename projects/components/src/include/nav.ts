import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpNav, BpNavItem, BpNavGroup } from '@blueprintui/components/nav';

defineElement('bp-nav', BpNav);
defineElement('bp-nav-item', BpNavItem);
defineElement('bp-nav-group', BpNavGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-nav': BpNav;
    'bp-nav-item': BpNavItem;
    'bp-nav-group': BpNavGroup;
  }
}
