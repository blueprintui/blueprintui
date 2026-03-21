import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpSelect, BpOption } from '@blueprintui/components/select';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-expand', BpButtonExpand);
defineElement('bp-select', BpSelect);
defineElement('bp-option', BpOption);

declare global {
  interface HTMLElementTagNameMap {
    'bp-select': BpSelect;
    'bp-option': BpOption;
  }
}
