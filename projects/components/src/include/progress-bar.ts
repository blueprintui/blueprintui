import { defineElement } from '@blueprintui/components/internals';
import { BpProgressBar } from '@blueprintui/components/progress-bar';

defineElement('bp-progress-bar', BpProgressBar);

declare global {
  interface HTMLElementTagNameMap {
    'bp-progress-bar': BpProgressBar;
  }
}
