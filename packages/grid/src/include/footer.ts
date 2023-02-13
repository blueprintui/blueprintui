import { defineElement } from '@blueprintui/components/internals';
import { BpGridFooter } from '../footer/element.js';

defineElement('bp-grid-footer', BpGridFooter);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-footer': BpGridFooter;
  }
}
