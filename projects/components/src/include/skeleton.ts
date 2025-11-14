import { defineElement } from '@blueprintui/components/internals';
import { BpSkeleton } from '@blueprintui/components/skeleton';

defineElement('bp-skeleton', BpSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    'bp-skeleton': BpSkeleton;
  }
}
