import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpNumber } from '@blueprintui/components/number';

defineElement('bp-number', BpNumber);

declare global {
  interface HTMLElementTagNameMap {
    'bp-number': BpNumber;
  }
}
