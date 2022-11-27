import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonIcon } from '@blueprintui/components/button-icon';

defineElement('bp-button-icon', BpButtonIcon);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-icon': BpButtonIcon;
  }
}
