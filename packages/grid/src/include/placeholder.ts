import { BpGridPlaceholder } from '../placeholder/element.js';

customElements.get('bp-grid-placeholder') ||  customElements.define('bp-grid-placeholder', BpGridPlaceholder);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-placeholder': BpGridPlaceholder;
  }
}
