import { BpDraggableList } from '../crane/index.js';
import { BpDraggableDropzone } from '../dropzone/index.js';

customElements.get('bp-draggable-list') ?? customElements.define('bp-draggable-list', BpDraggableList);
customElements.get('bp-draggable-dropzone') ?? customElements.define('bp-draggable-dropzone', BpDraggableDropzone);

declare global {
  interface HTMLElementTagNameMap {
    'bp-draggable-list': BpDraggableList;
    'bp-draggable-dropzone': BpDraggableDropzone;
  }
}
