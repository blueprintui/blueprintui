import { BpBadge } from '@blueprintui/components/badge';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-badge', BpBadge);

declare global {
  interface HTMLElementTagNameMap {
    'bp-badge': BpBadge;
  }
}
