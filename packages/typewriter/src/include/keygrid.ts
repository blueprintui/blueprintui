import { BpKeygrid } from '@blueprintui/typewriter/keygrid';

customElements.get('bp-keygrid') ?? customElements.define('bp-keygrid', BpKeygrid);

declare global {
  interface HTMLElementTagNameMap {
    'bp-keygrid': BpKeygrid;
  }
}
