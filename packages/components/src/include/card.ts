import { defineElement } from '@blueprintui/components/internals';
import { BpCard, BpCardHeader, BpCardFooter } from '@blueprintui/components/card';

defineElement('bp-card', BpCard);
defineElement('bp-card-header', BpCardHeader);
defineElement('bp-card-footer', BpCardFooter);

declare global {
  interface HTMLElementTagNameMap {
    'bp-card': BpCard;
    'bp-card-header': BpCardHeader;
    'bp-card-footer': BpCardFooter;
  }
}
