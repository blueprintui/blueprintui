import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/eye.js';
import '@blueprintui/icons/shapes/eye-hide.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpPassword } from '@blueprintui/components/password';

defineElement('bp-password', BpPassword);

declare global {
  interface HTMLElementTagNameMap {
    'bp-password': BpPassword;
  }
}
