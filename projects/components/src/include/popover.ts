import { defineElement } from '@blueprintui/components/internals';
import { BpPopover } from '@blueprintui/components/popover';

defineElement('bp-popover', BpPopover);

declare global {
  interface HTMLElementTagNameMap {
    'bp-popover': BpPopover;
  }
}
