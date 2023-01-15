import { LitElement, html, css } from 'lit';
import { draggableList } from '../internals/controllers/draggable-list.controller.js';

/**
 * @element bp-crane
 * @slot - content
 */
@draggableList<BpCrane>(host => ({
  manageFocus: true,
  manageTabindex: true,
  items: host.items,
  dropZones: host.dropZones
}))
export class BpCrane extends LitElement {
  static get styles() {
    return [
      css`
        :host, slot {
          display: contents;
        }
      `,
    ];
  }

  get items() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > *:not(bp-dropzone)'));
  }

  get dropZones() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > bp-dropzone'));
  }

  render() {
    return html`<slot @slotchange=${() => this.#updateChildren()}></slot>`;
  }

  #updateChildren() {
    this.items.forEach(i => i.draggable = true);
    this.dropZones.forEach(i => i.draggable = false);
  }
}
