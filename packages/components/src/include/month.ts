import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/dropdown.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/shapes/calendar.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpMonth } from '@blueprintui/components/month';

defineElement('bp-month', BpMonth);

declare global {
  interface HTMLElementTagNameMap {
    'bp-month': BpMonth;
  }
}
