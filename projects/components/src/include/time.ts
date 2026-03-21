import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/clock.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpTime } from '@blueprintui/components/time';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-time', BpTime);

declare global {
  interface HTMLElementTagNameMap {
    'bp-time': BpTime;
  }
}
