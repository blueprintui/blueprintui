import { BpGridPagination } from '../pagination/element.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/pagination.js';
import '@blueprintui/components/include/select.js';
import '@blueprintui/components/include/input.js';

customElements.get('bp-grid-pagination') ||  customElements.define('bp-grid-pagination', BpGridPagination);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-pagination': BpGridPagination;
  }
}
