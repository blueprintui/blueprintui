import { BpKeynav } from '../keynav/index.js';

customElements.get('bp-keynav') ?? customElements.define('bp-keynav', BpKeynav);

declare global {
  interface HTMLElementTagNameMap {
    'bp-keynav': BpKeynav;
  }
}
