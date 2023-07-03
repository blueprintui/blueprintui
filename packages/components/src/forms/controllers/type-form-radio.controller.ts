import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals, stopEvent } from '@blueprintui/components/internals';
import { TypeFormControl } from './type-form-control.controller.js';

export interface RadioControl extends TypeFormControl {
  checked: boolean;
  name: string;
}

export function typeFormRadio<T extends RadioControl & ReactiveElement>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeFormRadioController(instance));
}

export class TypeFormRadioController<T extends RadioControl & ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host.setAttribute('bp-field', 'inline');
    this.host.tabIndex = 0;
    this.host._internals.role = 'radio';

    this.host.addEventListener('click', () => this.#check());

    this.host.addEventListener('keyup', e => {
      if (e.code === 'Space') {
        this.#check();
      }
    });

    this.host.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        stopEvent(e);
      }
    });

    document.addEventListener('_change', async e => {
      const target = e.target as T;
      if (target !== this.host && target.name === this.host.name) {
        this.host.checked = false;
      } else if (target.name === this.host.name) {
        await new Promise(r => requestAnimationFrame(() => r('')));
        this.host.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      }
    });
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.host._internals.ariaDisabled = this.host.disabled ? 'true' : 'false';
    this.host._internals.ariaChecked = this.host.checked ? 'true' : 'false';

    const value = typeof this.host.value === 'number' ? `${this.host.value}` : this.host.value;
    this.host._internals.setFormValue(this.host.checked ? value : undefined);
  }

  #check() {
    if (!this.host.disabled && !this.host.checked) {
      this.host.checked = true;
      this.host.dispatchEvent(new Event('_change', { bubbles: true, composed: true }));
    }
  }
}
