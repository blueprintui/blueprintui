import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/info.js';
import '@blueprintui/icons/shapes/success.js';
import '@blueprintui/icons/shapes/warning.js';
import '@blueprintui/icons/shapes/error.js';
import { BpIcon } from '@blueprintui/icons';
import { BpBadge } from '@blueprintui/components/badge';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpStepper, BpStepperItem } from '@blueprintui/components/stepper';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-badge', BpBadge);
defineElement('bp-stepper', BpStepper);
defineElement('bp-stepper-item', BpStepperItem);

declare global {
  interface HTMLElementTagNameMap {
    'bp-stepper': BpStepper;
    'bp-stepper-item': BpStepperItem;
  }
}
