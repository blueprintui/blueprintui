import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/shapes/color-picker.js';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpColor } from '@blueprintui/components/color';
import { BpButtonIcon } from '@blueprintui/components/button-icon';

defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-color', BpColor);

declare global {
  interface HTMLElementTagNameMap {
    'bp-color': BpColor;
  }
}
