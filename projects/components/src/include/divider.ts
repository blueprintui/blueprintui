import { defineElement } from '@blueprintui/components/internals';
import { BpDivider } from '@blueprintui/components/divider';

defineElement('bp-divider', BpDivider);

declare global {
  interface HTMLElementTagNameMap {
    'bp-divider': BpDivider;
  }
}
