import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

export class BpDialogFooter extends LitElement {
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
    this.slot = 'footer';
  }
}