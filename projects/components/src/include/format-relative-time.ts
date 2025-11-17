import { BpFormatRelativeTime } from '@blueprintui/components/format-relative-time';
import { defineElement } from '@blueprintui/components/internals';

defineElement('bp-format-relative-time', BpFormatRelativeTime);

declare global {
  interface HTMLElementTagNameMap {
    'bp-format-relative-time': BpFormatRelativeTime;
  }
}
