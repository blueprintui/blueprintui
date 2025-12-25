import '@blueprintui/components/include/field.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpToggleGroup, BpToggleGroupOption } from '@blueprintui/components/toggle-group';

defineElement('bp-toggle-group', BpToggleGroup);
defineElement('bp-toggle-group-option', BpToggleGroupOption);

declare global {
  interface HTMLElementTagNameMap {
    'bp-toggle-group': BpToggleGroup;
    'bp-toggle-group-option': BpToggleGroupOption;
  }
}
