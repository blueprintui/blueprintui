import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpDialog } from '@blueprintui/components/dialog';

defineElement('bp-dialog', BpDialog);

declare global {
  interface HTMLElementTagNameMap {
    'bp-dialog': BpDialog;
  }
}
