import { defineElement } from '@blueprintui/components/internals';
import { BpDropdown } from '@blueprintui/components/dropdown';

defineElement('bp-dropdown', BpDropdown);

declare global {
  interface HTMLElementTagNameMap {
    'bp-dropdown': BpDropdown;
  }
}
