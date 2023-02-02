import { ReactiveElement } from 'lit';
import { TypeFormControl } from './type-form-control.controller.js';
import { TypeFormCheckboxController } from './type-form-checkbox.controller.js';

export interface SwitchControl extends TypeFormControl {
  checked: boolean;
  indeterminate?: boolean;
}

export class TypeFormSwitchController<T extends SwitchControl & ReactiveElement> extends TypeFormCheckboxController<T> {
  hostConnected() {
    super.hostConnected();
    this.host._internals.role = 'switch';
  }
}
