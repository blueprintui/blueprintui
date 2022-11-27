import { html, LitElement } from 'lit';
import { baseStyles } from '@blueprintui/components/internals';
import { default as footerStyles } from './element.css' assert { type: 'css' };

/**
 * @element bp-card-footer
 * @slot
 */
export class BpCardFooter extends LitElement {
  static styles = [baseStyles, footerStyles];

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
