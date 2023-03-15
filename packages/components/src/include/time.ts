import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/clock.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpTime } from '@blueprintui/components/time';

defineElement('bp-time', BpTime);

declare global {
  interface HTMLElementTagNameMap {
    'bp-time': BpTime;
  }
}
