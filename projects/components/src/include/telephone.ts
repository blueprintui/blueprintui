import '@blueprintui/components/include/forms.js';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpTelephone } from '@blueprintui/components/telephone';
import { BpButtonIcon } from '@blueprintui/components/button-icon';

defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-telephone', BpTelephone);

declare global {
  interface HTMLElementTagNameMap {
    'bp-telephone': BpTelephone;
  }
}
