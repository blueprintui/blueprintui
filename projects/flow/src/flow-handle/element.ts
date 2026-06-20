import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import styles from './element.css' with { type: 'css' };

/**
 * Flow Handle - Connection point for flow edges
 *
 * @element bp-flow-handle
 * @since 1.0.0
 * @cssprop --handle-size - size of the handle
 * @cssprop --handle-color - handle background color
 * @cssprop --handle-border - handle border
 */
export class BpFlowHandle extends LitElement {
  static styles = [styles];

  /** Handle identifier (defaults to position) */
  @property({ type: String }) accessor id = '';

  /** Handle position on the node */
  @property({ type: String, reflect: true }) accessor position: 'top' | 'right' | 'bottom' | 'left' = 'right';

  /** Connection type */
  @property({ type: String, reflect: true }) accessor type: 'source' | 'target' | 'both' = 'both';

  connectedCallback() {
    super.connectedCallback();
    // Use position as id if not provided
    if (!this.id) {
      this.id = this.position;
    }
  }

  render() {
    return html`<div part="handle" data-handle-id="${this.id}" data-type="${this.type}"></div>`;
  }
}
