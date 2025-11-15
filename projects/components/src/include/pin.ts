import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpPin } from '@blueprintui/components/pin';

defineElement('bp-pin', BpPin);

declare global {
  interface HTMLElementTagNameMap {
    'bp-pin': BpPin;
  }
}
