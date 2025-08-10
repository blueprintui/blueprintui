import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/folder.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpFile } from '@blueprintui/components/file';

defineElement('bp-file', BpFile);

declare global {
  interface HTMLElementTagNameMap {
    'bp-file': BpFile;
  }
}
