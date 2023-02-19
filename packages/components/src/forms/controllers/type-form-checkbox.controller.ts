import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals, stopEvent } from '@blueprintui/components/internals';
import { TypeFormControl } from './type-form-control.controller.js';

export interface CheckboxControl extends TypeFormControl {
  checked: boolean;
  indeterminate?: boolean;
}

export function typeFormCheckbox<T extends CheckboxControl & ReactiveElement>(config = { requireName: false }): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeFormCheckboxController(instance, config));
}

export class TypeFormCheckboxController<T extends CheckboxControl & ReactiveElement> implements ReactiveController {
  constructor(protected host: T, private config = { requireName: false }) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host.setAttribute('bp-field', 'inline');
    this.host.tabIndex = 0;
    this.host._internals.role = 'checkbox';
    this.host.addEventListener('click', () => this.#check());

    this.host.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.#check();
      }
    });

    this.host.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        stopEvent(e);
      }
    });
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.host._internals.ariaChecked = this.host.checked ? 'true' : 'false';
    this.host._internals.setFormValue(this.host.checked ? this.host.value : undefined);
  }

  #check() {
    if (!this.host.disabled && !this.host.readonly) {
      this.#updateValue();
      this.host.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  #updateValue() {
    // only update value statefully if name is set for form participation
    if (!(this.config.requireName && !this.host.name)) {
      this.host.checked = !this.host.checked;
      this.host.indeterminate = false;
    }
  }
}
