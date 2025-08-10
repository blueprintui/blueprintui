import { ReactiveController } from 'lit';
import type { BpGrid } from '../grid/element.js';

export class ColumnSpanController implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: BpGrid) {
    this.host.addController(this);
  }

  hostConnected() {
    this.#setupColSpanObserver();
    this.#updateAllColumnSpanStyles();
  }

  hostDisconnected() {
    this.#observer.disconnect();
  }

  #setupColSpanObserver() {
    this.#observer = new MutationObserver(mutation => {
      mutation
        .filter(m => m.type === 'attributes' && m.attributeName === 'aria-colspan')
        .forEach(m => this.#updateColumnSpanStyles(m.target as HTMLElement));
    });
    this.#observer.observe(this.host, { characterData: false, attributes: true, childList: true, subtree: true });
  }

  #updateAllColumnSpanStyles() {
    [...this.host.gridLayoutControllerConfig.columns, ...this.host.cells].forEach(cell =>
      this.#updateColumnSpanStyles(cell)
    );
  }

  #updateColumnSpanStyles(target: HTMLElement) {
    if (target.ariaColSpan) {
      target.style.gridColumnEnd = `span ${target.ariaColSpan}`;
    }
  }
}
