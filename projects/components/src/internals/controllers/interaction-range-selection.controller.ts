import { ReactiveController, ReactiveElement } from 'lit';
import { createCustomEvent, onFirstInteraction } from '../utils/events.js';

type SelectionElement = HTMLElement & { _internals: ElementInternals };

function inRange(value: number, a: number, b: number) {
  return value >= Math.min(a, b) && value <= Math.max(a, b);
}

type InteractionRangeSelectionConfig = {
  grid: HTMLElement[][];
  rangeSelection?: boolean;
};

export function interactionRangeSelection<T extends ReactiveElement>(
  fn?: (host: T) => InteractionRangeSelectionConfig
): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) => {
    return target.addInitializer((instance: T) => new InteractionRangeSelectionController(instance, fn));
  };
}

/**
 * Responsible for handling range selection in a grid of elements
 */
export class InteractionRangeSelectionController<T extends ReactiveElement> implements ReactiveController {
  #selectionActive = false;
  #firstCell: SelectionElement;
  #activeCell: SelectionElement;

  get #config() {
    const config = this.fn ? this.fn(this.host) : ({} as InteractionRangeSelectionConfig);
    return { rangeSelection: true, ...config };
  }

  get #cells() {
    return this.#config.grid.flatMap(row => row) as unknown as SelectionElement[];
  }

  get #enabled() {
    return this.#config.rangeSelection !== false;
  }

  constructor(
    private host: T,
    private fn: (host: T) => InteractionRangeSelectionConfig
  ) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    await onFirstInteraction(this.host);
    if (this.#enabled) {
      this.#setupKeyboardListeners();
      this.#setupMouseEvents();
    }
  }

  #setupMouseEvents() {
    this.host.addEventListener('pointerdown', (e: any) => {
      // preserve right click for context menus & keyboard mouse control https://apple.stackexchange.com/questions/32715/how-do-i-open-the-context-menu-from-a-mac-keyboard
      if (this.#enabled && e.buttons === 1 && !e.ctrlKey) {
        this.#setFirstCell(e);
      }
    });

    this.host.addEventListener('pointerover', (e: any) => {
      if (this.#enabled) {
        this.#setActiveCell(e.composedPath().find((i: any) => this.#cells.includes(i)));
      }
    });

    this.host.addEventListener('pointerup', () => {
      if (this.#enabled) {
        this.#stopSelection();
        this.#dispatchEvent('range-change');
      }
    });
  }

  #setupKeyboardListeners() {
    this.host.addEventListener('bp-keychange', (e: any) => {
      if (this.#enabled && e.detail.code) {
        if (e.detail.shiftKey) {
          this.#setActiveCell(e.detail.activeItem);
        } else {
          this.#stopSelection();
          this.#resetAllActiveCells();
        }
      }
    });

    this.host.addEventListener('keydown', (e: any) => {
      if (this.#enabled && e.code === 'ShiftLeft' && e.shiftKey && !this.#selectionActive) {
        this.#setFirstCell(e);
      }
    });

    this.host.addEventListener('keyup', (e: any) => {
      if (this.#enabled && e.code === 'ShiftLeft') {
        this.#dispatchEvent('range-change');
      }
    });
  }

  #setFirstCell(e: any) {
    const firstCell = e.composedPath().find((i: any) => Array.from(this.#cells).includes(i));
    if (firstCell) {
      this.#firstCell = firstCell;
      this.#selectionActive = true;
      this.#resetAllActiveCells();
    }
  }

  #setActiveCell(activeCell: SelectionElement) {
    if (activeCell && this.#selectionActive) {
      this.#activeCell = activeCell;
      this.#calculateSelection();
    }
  }

  #stopSelection() {
    this.#selectionActive = false;
  }

  #resetAllActiveCells() {
    this.#cells.forEach(cell => this.#deleteHighlight(cell));
  }

  #calculateSelection() {
    const x1 = parseInt(this.#firstCell.ariaColIndex);
    const x2 = parseInt(this.#activeCell.ariaColIndex);
    const y1 = parseInt(this.#firstCell.parentElement?.ariaRowIndex);
    const y2 = parseInt(this.#activeCell.parentElement?.ariaRowIndex);

    this.#resetAllActiveCells();
    this.#cells.forEach(cell => this.#updateCellHighlight(cell, x1, x2, y1, y2));

    this.#activeCell._internals?.states?.add('highlight-active');
    this.#addHighlightOutline();
    this.#dispatchEvent('range-input');
  }

  #updateCellHighlight(
    cell: HTMLElement & { _internals?: ElementInternals },
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) {
    const colIndex = parseInt(cell.ariaColIndex);
    const rowIndex = parseInt(cell.parentElement?.ariaRowIndex);

    [
      'highlight-active',
      'highlight-block-start',
      'highlight-block-end',
      'highlight-inline-start',
      'highlight-inline-end'
    ].forEach(state => cell._internals.states.delete(state));

    if (inRange(colIndex, x1, x2) && inRange(rowIndex, y1, y2)) {
      this.#addHighlight(cell);
    }
  }

  #dispatchEvent(event: string) {
    this.host.dispatchEvent(
      createCustomEvent(event, {
        detail: Array.from(this.#cells).filter(c => this.#hasHighlight(c))
      })
    );
  }

  #addHighlightOutline() {
    const grid = [...this.#config.grid.filter(r => r.find(c => this.#hasHighlight(c)))] as SelectionElement[][];
    grid.forEach((row, i) => (grid[i] = row.filter(c => this.#hasHighlight(c))));

    // first row
    grid[0].forEach(cell => cell._internals.states.add('highlight-block-start'));

    // last row
    grid[grid.length - 1].forEach(cell => cell._internals.states.add('highlight-block-end'));

    // first and last column
    grid.forEach(row => {
      row[0]._internals.states.add('highlight-inline-start');
      row[row.length - 1]._internals.states.add('highlight-inline-end');
    });
  }

  #hasHighlight(cell: HTMLElement & { _internals?: ElementInternals }) {
    return cell._internals?.states?.has('highlight');
  }

  #addHighlight(cell: HTMLElement & { _internals?: ElementInternals }) {
    cell._internals?.states?.add('highlight');
    cell.setAttribute('highlight', '');
  }

  #deleteHighlight(cell: HTMLElement & { _internals?: ElementInternals }) {
    cell._internals?.states?.delete('highlight');
  }
}
