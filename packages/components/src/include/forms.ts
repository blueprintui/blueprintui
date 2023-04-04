import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/success.js';
import '@blueprintui/icons/shapes/error.js';
import { attachRootNodeStyles, indicatorStyles, defineElement } from '@blueprintui/components/internals';
import { BpField, BpFieldset, BpFieldMessage, BpFormGroup } from '@blueprintui/components/forms';
attachRootNodeStyles(document, [indicatorStyles]);

defineElement('bp-field', BpField);
defineElement('bp-fieldset', BpFieldset);
defineElement('bp-field-message', BpFieldMessage);
defineElement('bp-form-group', BpFormGroup);

declare global {
  interface HTMLElementTagNameMap {
    'bp-field': BpField;
    'bp-field-message': BpFieldMessage;
    'bp-fieldset': BpFieldset;
    'bp-form-group': BpFormGroup;
  }
}
