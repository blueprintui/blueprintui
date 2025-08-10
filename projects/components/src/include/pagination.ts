import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import '@blueprintui/icons/shapes/step-forward-2.js';
import '@blueprintui/components/include/select.js';
import '@blueprintui/components/include/input.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpPagination, BpPaginationInput } from '@blueprintui/components/pagination';

defineElement('bp-pagination', BpPagination);
defineElement('bp-pagination-input', BpPaginationInput);

declare global {
  interface HTMLElementTagNameMap {
    'bp-pagination': BpPagination;
    'bp-pagination-input': BpPaginationInput;
  }
}
