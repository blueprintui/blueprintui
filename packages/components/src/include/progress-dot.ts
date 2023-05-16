import { defineElement } from '@blueprintui/components/internals';
import { BpProgressDot } from '@blueprintui/components/progress-dot';

defineElement('bp-progress-dot', BpProgressDot);

declare global {
  interface HTMLElementTagNameMap {
    'bp-progress-dot': BpProgressDot;
  }
}
