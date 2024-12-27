import { ReactiveController } from 'lit';
import type { BpGrid } from '../grid/element.js';

export class ClipboardController implements ReactiveController {
  constructor(private host: BpGrid) {
    this.host.addController(this);
  }

  #_listener = this.#listener.bind(this);

  hostConnected() {
    document.addEventListener('copy', this.#_listener);
  }

  hostDisconnected() {
    document.removeEventListener('copy', this.#_listener);
  }

  async #listener(e: ClipboardEvent) {
    if (this.host.contains(e.target as Node)) {
      const table = this.host.outerHTML
        .replaceAll('bp-grid-column', 'th')
        .replaceAll('bp-grid-row', 'tr')
        .replaceAll('bp-grid-cell', 'td')
        .replaceAll('bp-grid-header', 'thead')
        .replaceAll('bp-grid-footer', 'tfoot')
        .replaceAll('bp-grid', 'table');

      try {
        navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([this.host.innerText], { type: 'text/plain' }),
            'text/html': new Blob([table], { type: 'text/html' })
          })
        ]);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
