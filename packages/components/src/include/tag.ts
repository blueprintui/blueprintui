import { defineElement } from '@blueprintui/components/internals';
import { BpTag } from '@blueprintui/components/tag';

defineElement('bp-tag', BpTag);

declare global {
  interface HTMLElementTagNameMap {
    'bp-tag': BpTag;
  }
}
