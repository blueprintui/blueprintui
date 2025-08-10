import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button-expand.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpSelect, BpOption } from '@blueprintui/components/select';

defineElement('bp-select', BpSelect);
defineElement('bp-option', BpOption);

declare global {
  interface HTMLElementTagNameMap {
    'bp-select': BpSelect;
    'bp-option': BpOption;
  }
}
