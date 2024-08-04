import { BpCrane } from '../crane/index.js';
import { BpDropzone } from '../dropzone/index.js';

customElements.get('bp-crane') ?? customElements.define('bp-crane', BpCrane);
customElements.get('bp-dropzone') ?? customElements.define('bp-dropzone', BpDropzone);

declare global {
  interface HTMLElementTagNameMap {
    'bp-crane': BpCrane;
    'bp-dropzone': BpDropzone;
  }
}
