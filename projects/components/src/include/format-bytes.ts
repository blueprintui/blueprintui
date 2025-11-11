import { BpFormatBytes } from '@blueprintui/components/format-bytes';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-format-bytes', BpFormatBytes);

declare global {
  interface HTMLElementTagNameMap {
    'bp-format-bytes': BpFormatBytes;
  }
}
