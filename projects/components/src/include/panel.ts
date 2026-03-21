import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/close.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpPanel } from '@blueprintui/components/panel';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-panel', BpPanel);

declare global {
  interface HTMLElementTagNameMap {
    'bp-panel': BpPanel;
  }
}
