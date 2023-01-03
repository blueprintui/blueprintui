import { BpKeylist } from '@blueprintui/typewriter/keylist';

customElements.get('bp-keylist') ?? customElements.define('bp-keylist', BpKeylist);

declare global {
  interface HTMLElementTagNameMap {
    'bp-keylist': BpKeylist;
  }
}
