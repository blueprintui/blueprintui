import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/close.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpGridDetail } from '../detail/index.js';

defineElement('bp-grid-detail', BpGridDetail);

declare global {
  interface HTMLElementTagNameMap {
    'bp-grid-detail': BpGridDetail;
  }
}
