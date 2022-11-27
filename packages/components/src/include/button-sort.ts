import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonSort } from '@blueprintui/components/button-sort';

defineElement('bp-button-sort', BpButtonSort);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-sort': BpButtonSort;
  }
}
