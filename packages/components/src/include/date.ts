import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/components/include/dropdown.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/calendar.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpDate } from '@blueprintui/components/date';

defineElement('bp-date', BpDate);

declare global {
  interface HTMLElementTagNameMap {
    'bp-date': BpDate;
  }
}
