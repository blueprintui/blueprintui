import { ReactiveController } from 'lit';
import { insertSpanningCells } from '@blueprintui/grid/internals';
import type { BpGridCell } from '../cell/element.js';
import type { BpGridColumn } from '../column/element.js';
import type { BpGridFooter } from '../footer/element.js';
import type { BpGridPlaceholder } from '../placeholder/element.js';
import type { BpGridRow } from '../row/element.js';
import type { BpGrid } from './element.js';

/** controller for managing efficient DOM queries for bp-grid */
export class GridDOMController implements ReactiveController {
  #placeholder: BpGridPlaceholder;
  get placeholder() {
    if (!this.#placeholder) {
      this.#placeholder = this.host.querySelector<BpGridPlaceholder>('bp-grid-placeholder');
    }
    return this.#placeholder;
  }

  #footer: BpGridFooter;
  get footer() {
    if (!this.#footer) {
      this.#footer = this.host.querySelector<BpGridFooter>('bp-grid-footer');
    }
    return this.#footer;
  }

  #rows: BpGridRow[];
  get rows() {
    if (!this.#rows) {
      this.#rows = Array.from(this.host.querySelectorAll<BpGridRow>('bp-grid-row'));
    }
    return this.#rows;
  }

  #columns: BpGridColumn[];
  get columns() {
    if (!this.#columns) {
      this.#columns = Array.from(this.host.querySelectorAll<BpGridColumn>('bp-grid-column'));
    }
    return this.#columns;
  }

  #cells: BpGridCell[];
  get cells() {
    if (!this.#cells) {
      this.#cells = Array.from(this.host.querySelectorAll<BpGridCell>('bp-grid-cell'));
    }
    return this.#cells;
  }

  #grid: HTMLElement[][];
  get grid(): HTMLElement[][] {
    if (!this.#grid) {
      const columns = this.columns.filter(c => !c.ariaColSpan);
      const cells = insertSpanningCells([...columns, ...Array.from(this.cells)]);
      this.#grid = [];
      while (cells.length) {
        this.#grid.push(cells.splice(0, columns.length));
      }
    }
    return this.#grid;
  }

  #updates = 0;
  get isStatic() {
    this.#updates++;
    return (
      this.#updates === 1 &&
      !this.host.rangeSelection &&
      !this.host.querySelector('bp-grid-column bp-button-resize') &&
      !Array.from(this.columns).find(c => c.position !== undefined || c.draggable || c.width)
    );
  }

  constructor(private host: BpGrid) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    // reset cache if slotchange occurs
    this.host.shadowRoot.addEventListener('slotchange', async () => {
      await this.host.updateComplete;
      this.#resetCache();
      this.host.shadowRoot.dispatchEvent(new CustomEvent('bp-slotchange'));
    });

    // reset cache if a drag event occurs
    this.host.addEventListener('bp-crane-end', async () => {
      await this.host.updateComplete;
      this.#resetCache();
    });
  }

  #resetCache() {
    this.#grid = null;
    this.#columns = null;
    this.#rows = null;
    this.#cells = null;
    this.#placeholder = null;
    this.#footer = null;
  }
}
