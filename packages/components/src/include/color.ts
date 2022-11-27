import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/shapes/color-picker.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpColor } from '@blueprintui/components/color';

defineElement('bp-color', BpColor);

declare global {
  interface HTMLElementTagNameMap {
    'bp-color': BpColor;
  }
}
