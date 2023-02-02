import { ReactiveController, ReactiveElement } from 'lit';
import { stopEvent } from '@blueprintui/components/internals';
import { TypeFormControl } from './type-form-control.controller.js';

export interface CheckboxControl extends TypeFormControl {
  checked: boolean;
  indeterminate?: boolean;
}

export class TypeFormCheckboxController<T extends CheckboxControl & ReactiveElement> implements ReactiveController {
  constructor(protected host: T) {
    this.host.addController(this);
  }

  hostConnected() {
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
    this.host._internals.ariaDisabled = this.host.disabled ? 'true' : 'false';
    this.host._internals.ariaChecked = this.host.checked ? 'true' : 'false';
    this.host._internals.setFormValue(this.host.checked ? this.host.value : undefined);
  }

  #check() {
    if (!this.host.disabled) {
      this.host.checked = !this.host.checked;
      this.host.indeterminate = false;
      this.host.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}
