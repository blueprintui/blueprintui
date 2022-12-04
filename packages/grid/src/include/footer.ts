import { BpGridFooter } from '../footer/element.js';

customElements.get('bp-grid-footer') ||  customElements.define('bp-grid-footer', BpGridFooter);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-footer': BpGridFooter;
  }
}
