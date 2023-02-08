import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '@blueprintui/components/internals';
import { StateControlController } from './state-form-control.controller.js';
import { patternMismatch, tooLong, tooShort, valueMissing } from '../utils/validity.js';

export interface TypeFormControl {
  _internals?: ElementInternals;
  formAssociated: true;
  form: HTMLFormElement;
  name: string;
  validity: { valid: boolean, valueMissing?: boolean; tooShort?: boolean; tooLong?: boolean; patternMismatch?: boolean; };
  validationMessage: string;
  willValidate: boolean;
  checked?: boolean;
  disabled: boolean;
  value: string | FormData;
  checkValidity: () => void;
  reportValidity: () => boolean;
}

export class TypeFormControlController<T extends TypeFormControl & ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
    new StateControlController(this.host);
  }

  // todo: implement when supported https://github.com/WICG/aom/blob/gh-pages/caniuse.md#phase-2-reflect-element-references-for-idref-attributes
  hostConnected() {
    attachInternals(this.host);
    this.host.setAttribute('bp-field', '');
    this.host.reportValidity = () => this.#reportValidity();
    this.host.checkValidity = () => this.#checkValidity();
    this.host.addEventListener('blur', () => this.#checkValidity());
    if (!this.host.form && !Object.prototype.hasOwnProperty.call(this.host, 'form')) {
      Object.defineProperty(this.host, 'form', { get: () => this.host._internals.form });
      Object.defineProperty(this.host, 'name', { get: () => this.host.getAttribute('name'), set: (value: string) => this.host.setAttribute('name', value) });
      Object.defineProperty(this.host, 'validity', { get: () => this.host._internals.validity });
      Object.defineProperty(this.host, 'validationMessage', { get: () => this.host._internals.validationMessage });
      Object.defineProperty(this.host, 'willValidate', { get: () => this.host._internals.willValidate });
    }
  }

  hostUpdated() {
    this.host._internals.ariaDisabled = this.host.disabled ? 'true' : 'false';
    this.host._internals.setFormValue(this.host.value);
  }

  dispatchChange(e: InputEvent) {
    e?.preventDefault();
    e?.stopPropagation();

    if (!this.host.disabled) {
      this.host.checkValidity();
      this.host.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  dispatchInput(e: InputEvent) {
    e?.preventDefault();
    e?.stopPropagation();

    if (!this.host.disabled) {
      this.host.checkValidity();
      this.host.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, data: e.data }));
    }
  }

  #reportValidity() {
    this.#checkValidity();
    return this.host._internals.reportValidity();
  }

  #checkValidity() {
    this.host._internals.checkValidity();
    if (valueMissing(this.host)) {
      this.host._internals.setValidity({ valueMissing: true, valid: false }, 'value required');
    } else if (tooShort(this.host as unknown as HTMLInputElement)) {
      this.host._internals.setValidity({ tooShort: true, valid: false }, 'value too short');
    } else if (tooLong(this.host as unknown as HTMLInputElement)) {
      this.host._internals.setValidity({ tooLong: true, valid: false }, 'value too long');
    } else if (patternMismatch(this.host as unknown as HTMLInputElement)) {
      this.host._internals.setValidity({ patternMismatch: true, valid: false }, 'pattern mismatch');
    } else {
      this.host._internals.setValidity({ valid: true });
    }
  }
}
