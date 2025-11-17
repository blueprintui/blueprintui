import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpTelephone } from '@blueprintui/components/telephone';

defineElement('bp-telephone', BpTelephone);

declare global {
  interface HTMLElementTagNameMap {
    'bp-telephone': BpTelephone;
  }
}
