import { BpVirtualList } from '../virtual-list/index.js';

customElements.get('bp-virtual-list') ?? customElements.define('bp-virtual-list', BpVirtualList);

declare global {
  interface HTMLElementTagNameMap {
    'bp-virtual-list': BpVirtualList;
  }
}
