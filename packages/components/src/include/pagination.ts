import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import '@blueprintui/icons/shapes/step-forward-2.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpPagination } from '@blueprintui/components/pagination';

defineElement('bp-pagination', BpPagination);

declare global {
  interface HTMLElementTagNameMap {
    'bp-pagination': BpPagination;
  }
}
