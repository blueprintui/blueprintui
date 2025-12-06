import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/select.js';
import '@blueprintui/components/include/button-expand.js';
import '@blueprintui/components/include/tag.js';
import '@blueprintui/components/include/checkbox.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpCombobox } from '@blueprintui/components/combobox';

defineElement('bp-combobox', BpCombobox);

declare global {
  interface HTMLElementTagNameMap {
    'bp-combobox': BpCombobox;
  }
}
