import { defineElement } from '@blueprintui/components/internals';
import { BpFormatToken } from '@blueprintui/components/format-token';

defineElement('bp-format-token', BpFormatToken);

declare global {
  interface HTMLElementTagNameMap {
    'bp-format-token': BpFormatToken;
  }
}
