import { defineElement } from '@blueprintui/components/internals';
import { BpSplitView } from '@blueprintui/components/split-view';
import '@blueprintui/components/include/button-resize.js';

defineElement('bp-split-view', BpSplitView);

declare global {
  interface HTMLElementTagNameMap {
    'bp-split-view': BpSplitView;
  }
}
