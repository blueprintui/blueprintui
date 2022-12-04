import '@blueprintui/components/include/button-icon.js';

import { BpGrid } from '../grid/element.js';
import { BpGridRow } from '../row/element.js';
import { BpGridCell } from '../cell/element.js';
import { BpGridColumn } from '../column/element.js';

customElements.get('bp-grid') ||  customElements.define('bp-grid', BpGrid);
customElements.get('bp-grid-row') ||  customElements.define('bp-grid-row', BpGridRow);
customElements.get('bp-grid-cell') ||  customElements.define('bp-grid-cell', BpGridCell);
customElements.get('bp-grid-column') ||  customElements.define('bp-grid-column', BpGridColumn);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid': BpGrid;
    'bp-grid-row': BpGridRow;
    'bp-grid-cell': BpGridCell;
    'bp-grid-column': BpGridColumn;
  }
}
