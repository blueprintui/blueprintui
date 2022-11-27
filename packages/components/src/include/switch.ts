import '@blueprintui/components/include/forms.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpSwitch } from '@blueprintui/components/switch';

defineElement('bp-switch', BpSwitch);

declare global {
  interface HTMLElementTagNameMap {
    'bp-switch': BpSwitch;
  }
}
