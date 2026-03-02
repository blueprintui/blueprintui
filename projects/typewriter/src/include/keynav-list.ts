import { BpKeynavList } from '../keynav/index.js';

customElements.get('bp-keynav-list') ?? customElements.define('bp-keynav-list', BpKeynavList);

declare global {
  interface HTMLElementTagNameMap {
    'bp-keynav-list': BpKeynavList;
  }
}
