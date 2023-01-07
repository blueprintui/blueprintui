import { BpKeynav } from '@blueprintui/typewriter/keynav';

customElements.get('bp-keynav') ?? customElements.define('bp-keynav', BpKeynav);

declare global {
  interface HTMLElementTagNameMap {
    'bp-keynav': BpKeynav;
  }
}
