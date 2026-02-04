import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/picture.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonPip } from '@blueprintui/components/button-pip';

defineElement('bp-button-pip', BpButtonPip);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-pip': BpButtonPip;
  }
}
