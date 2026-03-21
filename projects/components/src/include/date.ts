import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/calendar.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpDate } from '@blueprintui/components/date';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-date', BpDate);

declare global {
  interface HTMLElementTagNameMap {
    'bp-date': BpDate;
  }
}
