import { defineElement } from '@blueprintui/components/internals';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/pagination.js';
import '@blueprintui/components/include/select.js';
import '@blueprintui/components/include/input.js';
import { BpGridPagination } from '../pagination/element.js';

defineElement('bp-grid-pagination', BpGridPagination);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-pagination': BpGridPagination;
  }
}
