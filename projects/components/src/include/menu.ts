import { defineElement } from '@blueprintui/components/internals';
import { BpMenu, BpMenuItem } from '@blueprintui/components/menu';

defineElement('bp-menu', BpMenu);
defineElement('bp-menu-item', BpMenuItem);

declare global {
  interface HTMLElementTagNameMap {
    'bp-menu': BpMenu;
    'bp-menu-item': BpMenuItem;
  }
}
