import { LitElement, html, css } from 'lit';

/**
 * @element bp-draggable-dropzone
 * @since 1.0.0
 * @slot - content
 */
export class BpDraggableDropzone extends LitElement {
  static styles = [
    css`
      :host,
      slot {
        display: contents;
      }
    `
  ];

  render() {
    return html`<div part="internal"><slot></slot></div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-draggable', 'dropzone');
  }
}
