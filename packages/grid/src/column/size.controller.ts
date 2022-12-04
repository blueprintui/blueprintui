import { ReactiveControllerHost } from 'lit';
import { isNumericString, listenForAttributeListChange, onFirstInteraction } from '@blueprintui/components/internals';
import type { BpGrid } from '../grid/element.js';

export type GridColumnSize = ReactiveControllerHost &
  HTMLElement & {
    width: string;
    type: string;
  };

export class GridColumnSizeController {
  #observers: (ResizeObserver | MutationObserver)[] = [];

  get #hostGrid() {
    return this.host.parentElement as BpGrid;
  }

  get #hostRange() {
    return this.host.shadowRoot?.querySelector<HTMLInputElement>('bp-split-handle input');
  }

  constructor(private host: GridColumnSize) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#setActionWidth();
    this.#hostGrid.shadowRoot?.addEventListener('slotchange', () => this.#setActionWidth());
    this.#observers.push(listenForAttributeListChange(this.host, ['type'], () => this.#setActionWidth()));
    await onFirstInteraction(this.#hostGrid);

    if (this.#hostRange) {
      this.#hostRange.max = `${parseInt(getComputedStyle(this.#hostGrid).width)}`;
      this.#hostRange.value = `${parseInt(getComputedStyle(this.host).width)}`;
      this.#hostRange.addEventListener('input', (e: any) => this.#updateResizedColumnWidth(e.target.valueAsNumber));
      this.#hostRange.addEventListener('change', (e: any) => this.#updateResizedColumnWidth(e.target.valueAsNumber));
    }
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#updateSetColumnWidth();
  }

  hostDisconnected() {
    this.#observers.forEach(o => o.disconnect());
  }

  #setActionWidth() {
    if (this.host.type === 'action' || this.host.getAttribute('type') === 'action') {
      this.host.width = '48px';
      const { columns, rows } = this.#hostGrid.gridColumnSizeControllerConfig;
      const index = Array.from(columns).indexOf(this.host as any);
      rows.forEach(r => {
        const rowCells = r.querySelectorAll('bp-grid-cell');
        rowCells[index].setAttribute('type', 'action');
      });
    }
  }

  #updateSetColumnWidth() {
    if (this.host.width && this.host.ariaColIndex !== null) {
      this.#hostGrid.style.setProperty(
        `--ch${this.host.ariaColIndex}`,
        isNumericString(this.host.width) ? `${this.host.width}px` : this.host.width
      );

      if (this.#hostRange) {
        this.#hostRange.min = `${parseInt(this.host.width)}` ?? '';
        this.#hostRange.value = this.host.width;
      }
    }
  }

  #updateResizedColumnWidth(width: number) {
    this.host.dispatchEvent(new CustomEvent('resizeChange', { detail: width, bubbles: true }));
    const updatedWidth = Math.max(
      isNumericString(this.host.width) || this.host.width?.includes('px') ? parseInt(this.host.width) : 36,
      width
    );
    this.#hostGrid.style.setProperty(`--ch${this.host.ariaColIndex}`, `${updatedWidth}px`);
  }
}
