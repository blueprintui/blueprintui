import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/close.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpDrawer } from '@blueprintui/components/drawer';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-drawer', BpDrawer);

declare global {
  interface HTMLElementTagNameMap {
    'bp-drawer': BpDrawer;
  }
}
