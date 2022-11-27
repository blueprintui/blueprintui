import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpInput } from '@blueprintui/components/input';

defineElement('bp-input', BpInput);

declare global {
  interface HTMLElementTagNameMap {
    'bp-input': BpInput;
  }
}
