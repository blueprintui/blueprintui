import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/captions.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpButtonCaptions } from '@blueprintui/components/button-captions';

defineElement('bp-button-captions', BpButtonCaptions);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-captions': BpButtonCaptions;
  }
}
