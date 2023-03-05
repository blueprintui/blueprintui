import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators/property.js';
import { keynav } from '../internals/controllers/keynav.controller.js';

/**
 * @element bp-keynav
 * @slot - content
 */

@keynav<BpKeynav>(host => ({ grid: host.grid, loop: host.loop, columns: host.columns }))
export class BpKeynav extends LitElement {
  @property({ type: Number }) columns: number;

  @property({ type: String }) layout: 'inline' | 'block' | 'grid' = 'grid';

  @property({ type: Boolean }) loop: boolean;

  get grid(): HTMLElement[][] {
    return this.layout === 'inline' ? this.#inline : this.#grid;
  }

  get #grid() {
    const columns = this.columns ?? getComputedStyle(this).getPropertyValue('grid-template-columns').split(' ').length;
    const cells = Array.from(this.querySelectorAll<HTMLElement>('*'));
    const grid = [];
    while (cells.length) {
      grid.push(cells.splice(0, columns));
    }
    return grid;
  }

  get #inline() {
    return [Array.from(this.querySelectorAll<HTMLElement>(':scope > *'))].filter((i: any) => i.disabled !== true);
  }

  static styles = [
    css`
      :host,
      slot {
        display: contents;
      }
    `
  ];

  #internals = this.attachInternals();

  render() {
    return html`<slot role="presentation"></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'presentation';
  }
}
