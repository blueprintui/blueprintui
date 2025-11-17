import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/button-icon.js';
import { defineElement } from '@blueprintui/components/internals';
import { BpNumberStepper } from '@blueprintui/components/number-stepper';

defineElement('bp-number-stepper', BpNumberStepper);

declare global {
  interface HTMLElementTagNameMap {
    'bp-number-stepper': BpNumberStepper;
  }
}
