import { defineElement } from '@blueprintui/components/internals';
import { BpPage } from '@blueprintui/components/page';

defineElement('bp-page', BpPage);

declare global {
  interface HTMLElementTagNameMap {
    'bp-page': BpPage;
  }
}
