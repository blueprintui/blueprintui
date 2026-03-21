import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import '@blueprintui/icons/shapes/step-forward-2.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { BpSelect, BpOption } from '@blueprintui/components/select';
import { BpInput } from '@blueprintui/components/input';
import { BpField, BpFieldset, BpFieldMessage, BpFormGroup } from '@blueprintui/components/forms';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpPagination, BpPaginationInput } from '@blueprintui/components/pagination';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineScopedElement('bp-button-expand', BpButtonExpand);
defineScopedElement('bp-select', BpSelect);
defineScopedElement('bp-option', BpOption);
defineScopedElement('bp-input', BpInput);
defineScopedElement('bp-field', BpField);
defineScopedElement('bp-fieldset', BpFieldset);
defineScopedElement('bp-field-message', BpFieldMessage);
defineScopedElement('bp-form-group', BpFormGroup);
defineElement('bp-pagination', BpPagination);
defineElement('bp-pagination-input', BpPaginationInput);

declare global {
  interface HTMLElementTagNameMap {
    'bp-pagination': BpPagination;
    'bp-pagination-input': BpPaginationInput;
  }
}
