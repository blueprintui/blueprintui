import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonExpand } from '@blueprintui/components/button-expand';

defineElement('bp-button-expand', BpButtonExpand);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-expand': BpButtonExpand;
  }
}
