import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/drag-handle.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonHandle } from '@blueprintui/components/button-handle';

defineElement('bp-button-handle', BpButtonHandle);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-handle': BpButtonHandle;
  }
}
