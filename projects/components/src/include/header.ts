import { defineElement } from '@blueprintui/components/internals';
import { BpHeader, BpHeaderItem } from '@blueprintui/components/header';

defineElement('bp-header', BpHeader);
defineElement('bp-header-item', BpHeaderItem);

declare global {
  interface HTMLElementTagNameMap {
    'bp-header': BpHeader;
    'bp-header-item': BpHeaderItem;
  }
}
