import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpDrawer } from '@blueprintui/components/drawer';

defineElement('bp-drawer', BpDrawer);

declare global {
  interface HTMLElementTagNameMap {
    'bp-drawer': BpDrawer;
  }
}
