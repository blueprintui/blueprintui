import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpTextarea } from '@blueprintui/components/textarea';

defineElement('bp-textarea', BpTextarea);

declare global {
  interface HTMLElementTagNameMap {
    'bp-textarea': BpTextarea;
  }
}
