import { BpCrane } from '@blueprintui/crane/crane';
import { BpDropzone } from '@blueprintui/crane/dropzone';

customElements.get('bp-crane') ?? customElements.define('bp-crane', BpCrane);
customElements.get('bp-dropzone') ?? customElements.define('bp-dropzone', BpDropzone);

declare global {
  interface HTMLElementTagNameMap {
    'bp-crane': BpCrane;
    'bp-dropzone': BpDropzone;
  }
}
