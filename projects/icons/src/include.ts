import { BpIcon } from './icon/index.js';

customElements.get('bp-icon') || customElements.define('bp-icon', BpIcon);

declare global {
  interface HTMLElementTagNameMap {
    'bp-icon': BpIcon;
  }
}
