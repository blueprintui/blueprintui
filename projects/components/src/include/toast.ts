import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import '@blueprintui/icons/shapes/close.js';
import '@blueprintui/icons/shapes/info.js';
import '@blueprintui/icons/shapes/success.js';
import '@blueprintui/icons/shapes/warning.js';
import '@blueprintui/icons/shapes/error.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpToast } from '@blueprintui/components/toast';

defineElement('bp-toast', BpToast);

declare global {
  interface HTMLElementTagNameMap {
    'bp-toast': BpToast;
  }
}
