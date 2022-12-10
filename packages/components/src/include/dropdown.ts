import { defineElement } from '@blueprintui/components/internals';
import { BpDropdown } from '@blueprintui/components/dropdown';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';

defineElement('bp-dropdown', BpDropdown);

declare global {
  interface HTMLElementTagNameMap {
    'bp-dropdown': BpDropdown;
  }
}
