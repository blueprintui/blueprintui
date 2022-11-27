import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpCheckbox } from '@blueprintui/components/checkbox';

defineElement('bp-checkbox', BpCheckbox);

declare global {
  interface HTMLElementTagNameMap {
    'bp-checkbox': BpCheckbox;
  }
}
