import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/folder.js';
import '@blueprintui/icons/shapes/close.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButton } from '@blueprintui/components/button';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpFile } from '@blueprintui/components/file';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button', BpButton);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-file', BpFile);

declare global {
  interface HTMLElementTagNameMap {
    'bp-file': BpFile;
  }
}
