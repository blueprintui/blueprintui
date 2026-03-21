import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/calendar.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpMonth } from '@blueprintui/components/month';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-month', BpMonth);

declare global {
  interface HTMLElementTagNameMap {
    'bp-month': BpMonth;
  }
}
