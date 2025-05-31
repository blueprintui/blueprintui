import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpPanel } from '@blueprintui/components/panel';

defineElement('bp-panel', BpPanel);

declare global {
  interface HTMLElementTagNameMap {
    'bp-panel': BpPanel;
  }
}
