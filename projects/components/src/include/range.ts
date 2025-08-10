import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpRange } from '@blueprintui/components/range';

defineElement('bp-range', BpRange);

declare global {
  interface HTMLElementTagNameMap {
    'bp-range': BpRange;
  }
}
