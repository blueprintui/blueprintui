import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keyGrid } from '../internals/controllers/key-grid.controller.js';

/**
 * @element bp-keygrid
 * @slot - content
 */

@keyGrid<BpKeygrid>(host => ({ grid: host.grid }))
export class BpKeygrid extends LitElement {
  @property({ type: Number }) columns: number;

  get grid(): HTMLElement[][] {
    const columns = this.columns ?? getComputedStyle(this).getPropertyValue('grid-template-columns').split(' ').length;
    const cells = Array.from(this.querySelectorAll<HTMLElement>('*'));
    const grid = [];
    while(cells.length) {
      grid.push(cells.splice(0, columns));
    }
    return grid;
  }

  static styles = [css`
    :host,
    slot {
      display: contents;
    }
  `];

  #internals = this.attachInternals();

  render() {
    return html`<slot role="presentation"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'presentation';
  }
}
