import { defineElement } from '@blueprintui/components/internals';
import { BpRangeTime } from '@blueprintui/components/range-time';

defineElement('bp-range-time', BpRangeTime);

declare global {
  interface HTMLElementTagNameMap {
    'bp-range-time': BpRangeTime;
  }
}
