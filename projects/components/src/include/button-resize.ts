import { defineElement } from '@blueprintui/components/internals';
import { BpButtonResize } from '@blueprintui/components/button-resize';

defineElement('bp-button-resize', BpButtonResize);

declare global {
  interface HTMLElementTagNameMap {
    'bp-button-resize': BpButtonResize;
  }
}
