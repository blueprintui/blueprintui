import { ReactiveController } from 'lit';
import { isNumericString } from '@blueprintui/components/internals';
import type { BpGrid } from '../grid/element.js';
import type { BpGridColumn } from './element.js';

export class GridColumnWidthController implements ReactiveController {
  #grid: BpGrid;

  constructor(private host: BpGridColumn) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#grid = this.host.parentElement.parentElement as BpGrid;
    this.#updateSetColumnWidth();
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#updateSetColumnWidth();
  }

  #updateSetColumnWidth() {
    if (this.host.width === 'max-content') {
      const colIndex = this.#grid.grid[0].indexOf(this.host);
      const firstColCell = this.#grid.grid[1][colIndex];
      const { width } = getComputedStyle(firstColCell);
      this.#grid.style.setProperty(`--ch${colIndex + 1}`, width);
    } else if (this.host.width) {
      const width = isNumericString(this.host.width) ? `${this.host.width}px` : this.host.width;
      this.#grid.style.setProperty(`--ch${this.host.ariaColIndex}`, width);
    }
  }
}
