import { BpFormatNumber } from '@blueprintui/components/format-number';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-format-number', BpFormatNumber);

declare global {
  interface HTMLElementTagNameMap {
    'bp-format-number': BpFormatNumber;
  }
}
