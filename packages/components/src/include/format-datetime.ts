import { BpFormatDatetime } from '@blueprintui/components/format-datetime';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-format-datetime', BpFormatDatetime);

declare global {
  interface HTMLElementTagNameMap {
    'bp-format-datetime': BpFormatDatetime;
  }
}
