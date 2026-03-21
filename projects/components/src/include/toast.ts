import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import '@blueprintui/icons/shapes/close.js';
import '@blueprintui/icons/shapes/info.js';
import '@blueprintui/icons/shapes/success.js';
import '@blueprintui/icons/shapes/warning.js';
import '@blueprintui/icons/shapes/error.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpToast } from '@blueprintui/components/toast';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-toast', BpToast);

declare global {
  interface HTMLElementTagNameMap {
    'bp-toast': BpToast;
  }
}
