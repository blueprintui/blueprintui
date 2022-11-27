import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpRadio } from '@blueprintui/components/radio';

defineElement('bp-radio', BpRadio);

declare global {
  interface HTMLElementTagNameMap {
    'bp-radio': BpRadio;
  }
}
