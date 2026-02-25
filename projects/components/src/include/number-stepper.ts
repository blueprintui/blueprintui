import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button-icon.js';
import '@blueprintui/icons/include.js';
import '@blueprintui/icons/shapes/add.js';
import '@blueprintui/icons/shapes/minus.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpNumberStepper } from '@blueprintui/components/number-stepper';

defineElement('bp-number-stepper', BpNumberStepper);

declare global {
  interface HTMLElementTagNameMap {
    'bp-number-stepper': BpNumberStepper;
  }
}
