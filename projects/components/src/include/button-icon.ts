import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/ellipsis-vertical.js';
import { BpIcon } from '@blueprintui/icons';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpButtonIcon } from '@blueprintui/components/button-icon';

defineScopedElement('bp-icon', BpIcon);
defineElement('bp-button-icon', BpButtonIcon);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-icon': BpButtonIcon;
  }
}
