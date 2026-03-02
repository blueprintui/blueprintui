import { LitElement, html, css } from 'lit';
import { draggableList } from '../internals/controllers/draggable-list.controller.js';

/**
 * @element bp-draggable-list
 * @since 1.0.0
 * @slot - content
 */
@draggableList<BpDraggableList>(host => ({
  manageFocus: true,
  manageTabindex: true,
  items: host.items,
  dropZones: host.dropZones
}))
export class BpDraggableList extends LitElement {
  static styles = [
    css`
      :host,
      slot {
        display: contents;
      }
    `
  ];

  get items() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > *:not(bp-draggable-dropzone)'));
  }

  get dropZones() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > bp-draggable-dropzone'));
  }

  render() {
    return html`<slot @slotchange=${this.#updateChildren}></slot>`;
  }

  #updateChildren() {
    this.items.forEach(i => (i.draggable = true));
    this.dropZones.forEach(i => (i.draggable = false));
  }
}
