import { defineElement } from '@blueprintui/components/internals';
import { BpGrid } from '../grid/element.js';
import { BpGridHeader } from '../header/element.js';
import { BpGridRow } from '../row/element.js';
import { BpGridCell } from '../cell/element.js';
import { BpGridColumn } from '../column/element.js';

defineElement('bp-grid', BpGrid);
defineElement('bp-grid-header', BpGridHeader);
defineElement('bp-grid-row', BpGridRow);
defineElement('bp-grid-cell', BpGridCell);
defineElement('bp-grid-column', BpGridColumn);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid': BpGrid;
    'bp-grid-header': BpGridHeader;
    'bp-grid-row': BpGridRow;
    'bp-grid-cell': BpGridCell;
    'bp-grid-column': BpGridColumn;
  }
}
