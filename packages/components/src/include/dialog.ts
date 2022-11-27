import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpDialog, BpDialogHeader, BpDialogFooter } from '@blueprintui/components/dialog';

defineElement('bp-dialog', BpDialog);
defineElement('bp-dialog-header', BpDialogHeader);
defineElement('bp-dialog-footer', BpDialogFooter);

declare global {
  interface HTMLElementTagNameMap {
    'bp-dialog': BpDialog;
    'bp-dialog-header': BpDialogHeader;
    'bp-dialog-footer': BpDialogFooter;
  }
}
