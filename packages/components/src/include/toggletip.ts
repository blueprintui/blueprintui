import { defineElement } from '@blueprintui/components/internals';
import { BpToggletip } from '@blueprintui/components/toggletip';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';

defineElement('bp-toggletip', BpToggletip);

declare global {
  interface HTMLElementTagNameMap {
    'bp-toggletip': BpToggletip;
  }
}
