import '@blueprintui/components/include/button-icon.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonIconGroup } from '@blueprintui/components/button-icon-group';

defineElement('bp-button-icon-group', BpButtonIconGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-icon-group': BpButtonIconGroup;
  }
}
