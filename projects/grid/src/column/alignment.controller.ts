import { ReactiveController, ReactiveControllerHost } from 'lit';
import { attachInternals } from '@blueprintui/components/internals';
import type { BpGrid } from '../grid/element.js';
import type { BpGridCell } from '../cell/element.js';
import type { BpGridColumn } from './element.js';

export type ColumnAlignment = ReactiveControllerHost & BpGridColumn & { alignment: 'start' | 'center' | 'end' };

export class ColumnAlignmentController implements ReactiveController {
  #alignment: 'start' | 'center' | 'end';

  get #columnItems() {
    const grid = (this.host.parentElement.parentElement as BpGrid).grid;
    const index = grid[0].indexOf(this.host);
    return this.host.ariaColSpan
      ? [this.host]
      : (grid.slice(0).map(row => row[index]) as (BpGridColumn | BpGridCell)[]);
  }

  constructor(private host: ColumnAlignment) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.#align();
  }

  hostUpdated() {
    this.#align();
  }

  #align() {
    if (this.host.alignment !== this.#alignment) {
      this.#columnItems.forEach(i => {
        resetAlignmentState(i);

        if (this.host.alignment) {
          i._internals.states.add(`alignment-${this.host.alignment}`);
        }
      });

      this.#alignment = this.host.alignment;
    }
  }
}

export function resetAlignmentState(element: HTMLElement & { _internals: ElementInternals }) {
  element._internals.states.delete('alignment-start');
  element._internals.states.delete('alignment-center');
  element._internals.states.delete('alignment-end');
}
