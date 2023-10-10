import { ReactiveElement } from 'lit';
import { TypeFormControl } from './type-form-control.controller.js';
import { TypeFormCheckboxController } from './type-form-checkbox.controller.js';

export interface SwitchControl extends TypeFormControl {
  checked: boolean;
  indeterminate?: boolean;
}

export function typeFormSwitch<T extends SwitchControl & ReactiveElement>(
  config = { requireName: false }
): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new TypeFormSwitchController(instance, config));
}

export class TypeFormSwitchController<T extends SwitchControl & ReactiveElement> extends TypeFormCheckboxController<T> {
  hostConnected() {
    super.hostConnected();
    this.host._internals.role = 'switch';
  }
}
