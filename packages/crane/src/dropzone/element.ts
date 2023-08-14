import { LitElement, html, css } from 'lit';

/**
 * @element bp-dropzone
 * @since 1.0.0
 * @slot - content
 */
export class BpDropzone extends LitElement {
  static get styles() {
    return [
      css`
        :host,
        slot {
          display: contents;
        }
      `
    ];
  }

  render() {
    return html`<slot></slot>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('bp-crane', 'dropzone');
  }
}
