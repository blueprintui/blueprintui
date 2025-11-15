import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/copy.js';
import '@blueprintui/icons/shapes/check.js';
import '@blueprintui/icons/shapes/error.js';
import '@blueprintui/components/include/tooltip.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonCopy } from '@blueprintui/components/button-copy';

defineElement('bp-button-copy', BpButtonCopy);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-copy': BpButtonCopy;
  }
}
