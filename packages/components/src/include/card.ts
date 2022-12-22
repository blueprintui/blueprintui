import { defineElement } from '@blueprintui/components/internals';
import { BpCard } from '@blueprintui/components/card';

defineElement('bp-card', BpCard);

declare global {
  interface HTMLElementTagNameMap {
    'bp-card': BpCard;
  }
}
