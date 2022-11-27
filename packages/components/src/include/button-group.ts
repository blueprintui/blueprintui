import '@blueprintui/components/include/button.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonGroup } from '@blueprintui/components/button-group';

defineElement('bp-button-group', BpButtonGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-group': BpButtonGroup;
  }
}
