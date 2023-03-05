import { defineElement } from '@blueprintui/components/internals';
import { BpProgressCircle } from '@blueprintui/components/progress-circle';

defineElement('bp-progress-circle', BpProgressCircle);

declare global {
  interface HTMLElementTagNameMap {
    'bp-progress-circle': BpProgressCircle;
  }
}
