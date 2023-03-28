import { ReactiveController } from 'lit';
import { attachRootNodeStyles } from '@blueprintui/components/internals';
import type { BpGrid } from './element.js';

/** controller for managing hover effects */
export class GridHoverController implements ReactiveController {
  #columnStyles: CSSStyleSheet;

  constructor(private host: BpGrid) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#initializeColumnHoverState();
    this.host.addEventListener('mouseout', () => this.#removeHoverStyles());
  }

  hostUpdated() {
    this.#initializeColumnHoverState();
  }

  #initializeColumnHoverState() {
    if (this.host.columnStyle?.includes('hover') && !this.#columnStyles) {
      this.#columnStyles = new CSSStyleSheet();
      attachRootNodeStyles(this.host, [this.#columnStyles]);

      this.host.addEventListener('mouseover', e => {
        const cell = (e.target as HTMLElement).closest('bp-grid-cell, bp-grid-column');
        if (cell) {
          const index =
            Array.from(cell.parentElement.querySelectorAll('bp-grid-cell, bp-grid-column')).indexOf(cell) + 1;
          (this.#columnStyles as any).replaceSync(/* css */ `
            bp-grid[_id=${this.host._id}] bp-grid-cell:nth-child(${index}),
            bp-grid[_id=${this.host._id}] bp-grid-column:nth-child(${index}) {
              --interaction-offset: var(--bp-interaction-hover-offset);
            }
          `);
        }
      });
    }
  }

  #removeHoverStyles() {
    (this.#columnStyles as any)?.replaceSync(/* css */ ``);
  }
}
