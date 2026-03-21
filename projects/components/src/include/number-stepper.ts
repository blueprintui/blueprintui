import '@blueprintui/components/include/forms.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/add.js';
import '@blueprintui/icons/shapes/minus.js';
import { BpIcon } from '@blueprintui/icons';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import { defineElement, defineScopedElement } from '@blueprintui/components/internals';
import { BpNumberStepper } from '@blueprintui/components/number-stepper';

defineScopedElement('bp-icon', BpIcon);
defineScopedElement('bp-button-icon', BpButtonIcon);
defineElement('bp-number-stepper', BpNumberStepper);

declare global {
  interface HTMLElementTagNameMap {
    'bp-number-stepper': BpNumberStepper;
  }
}
