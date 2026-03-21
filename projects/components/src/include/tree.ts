import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/angle.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonExpand } from '@blueprintui/components/button-expand';
import { BpCheckbox } from '@blueprintui/components/checkbox';
import { BpField, BpFieldset, BpFieldMessage, BpFormGroup } from '@blueprintui/components/forms';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpTree, BpTreeItem } from '@blueprintui/components/tree';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-expand', BpButtonExpand);
defineScopedElement('bp-checkbox', BpCheckbox);
defineScopedElement('bp-field', BpField);
defineScopedElement('bp-fieldset', BpFieldset);
defineScopedElement('bp-field-message', BpFieldMessage);
defineScopedElement('bp-form-group', BpFormGroup);
defineElement('bp-tree', BpTree);
defineElement('bp-tree-item', BpTreeItem);

declare global {
  interface HTMLElementTagNameMap {
    'bp-tree': BpTree;
    'bp-tree-item': BpTreeItem;
  }
}
