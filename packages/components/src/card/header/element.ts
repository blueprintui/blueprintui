import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * @element bp-header
 * @slot
 * @cssprop --background
 */
export class BpCardHeader extends LitElement {
  static styles = [baseStyles, styles];

  render() {
    return html`
      <div class="private-host">        
        <slot></slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.slot = 'header';
  }
}
