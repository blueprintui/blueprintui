import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals, getFlattenedFocusableItems } from '@blueprintui/components/internals';
import { StateControlController } from './state-form-control.controller.js';
import {
  badInput,
  patternMismatch,
  rangeOverflow,
  rangeUnderflow,
  stepMismatch,
  tooLong,
  tooShort,
  typeMismatch,
  valueMissing
} from '../utils/validity.js';

export interface TypeFormControl {
  _internals?: ElementInternals;
  formAssociated: true;
  form: HTMLFormElement;
  name: string;
  validity: ValidityState;
  validationMessage: string;
  willValidate: boolean;
  valueAsNumber: number;
  composedLabel: string;
  checked?: boolean;
  readonly?: boolean;
  disabled: boolean;
  value?: string | number | FormData | File;
  min: number;
  max: number;
  checkValidity: () => void;
  reportValidity: () => boolean;
  reset: () => void;
}

export function typeFormControl<T extends TypeFormControl & ReactiveElement>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) => {
    return target.addInitializer((instance: T & { typeFormControlController?: TypeFormControlController<T> }) => {
      if (!instance.typeFormControlController) {
        Object.defineProperty(instance, 'typeFormControlController', {
          value: new TypeFormControlController(instance),
          writable: false
        });
      }

      return instance.typeFormControlController;
    });
  };
}

export class TypeFormControlController<T extends TypeFormControl & ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
    new StateControlController(this.host);
  }

  hostConnected() {
    // todo: implement when supported https://github.com/WICG/aom/blob/gh-pages/caniuse.md#phase-2-reflect-element-references-for-idref-attributes
    attachInternals(this.host);
    this.host.setAttribute('bp-field', '');
    this.host.reportValidity = () => this.#reportValidity();
    this.host.checkValidity = () => this.#checkValidity();
    this.host.addEventListener('blur', () => this.#checkValidity());
    if (!this.host.form && !Object.prototype.hasOwnProperty.call(this.host, 'form')) {
      Object.defineProperty(this.host, 'form', { get: () => this.host._internals.form });
      Object.defineProperty(this.host, 'name', {
        get: () => this.host.getAttribute('name'),
        set: (value: string) => this.host.setAttribute('name', value)
      });
      Object.defineProperty(this.host, 'validity', { get: () => this.host._internals.validity });
      Object.defineProperty(this.host, 'validationMessage', { get: () => this.host._internals.validationMessage });
      Object.defineProperty(this.host, 'willValidate', { get: () => this.host._internals.willValidate });
    }
  }

  hostUpdated() {
    this.#updateAria();
    this.host._internals.setFormValue(typeof this.host.value === 'number' ? `${this.host.value}` : this.host.value);
  }

  focus() {
    getFlattenedFocusableItems(this.host)[0]?.focus();
  }

  reset() {
    this.host.value = this.host.getAttribute('value');
    this.host.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    this.host.dispatchEvent(new Event('reset', { bubbles: true, cancelable: true }));
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

  #updateAria() {
    this.host._internals.ariaDisabled = this.host.disabled ? 'true' : 'false';

    if (this.host.min !== undefined || this.host.max !== undefined) {
      this.host._internals.ariaValueMin = `${this.host.min}`;
      this.host._internals.ariaValueMax = `${this.host.max}`;
      this.host._internals.ariaValueNow = `${this.host.value}`;
    } else {
      this.host._internals.ariaValueMin = null;
      this.host._internals.ariaValueMax = null;
      this.host._internals.ariaValueNow = null;
    }
  }

  #reportValidity() {
    this.#checkValidity();
    return this.host._internals.reportValidity();
  }

  #checkValidity() {
    this.host._internals.checkValidity();
    const element = this.host as unknown as HTMLInputElement;

    if (valueMissing(this.host)) {
      this.host._internals.setValidity({ valueMissing: true, valid: false }, 'value required');
    } else if (typeMismatch(element)) {
      this.host._internals.setValidity({ typeMismatch: true, valid: false }, 'type mismatch');
    } else if (patternMismatch(element)) {
      this.host._internals.setValidity({ patternMismatch: true, valid: false }, 'pattern mismatch');
    } else if (tooShort(element)) {
      this.host._internals.setValidity({ tooShort: true, valid: false }, 'value too short');
    } else if (tooLong(element)) {
      this.host._internals.setValidity({ tooLong: true, valid: false }, 'value too long');
    } else if (rangeUnderflow(element)) {
      this.host._internals.setValidity({ rangeUnderflow: true, valid: false }, 'value too low');
    } else if (rangeOverflow(element)) {
      this.host._internals.setValidity({ rangeOverflow: true, valid: false }, 'value too high');
    } else if (stepMismatch(element)) {
      this.host._internals.setValidity({ stepMismatch: true, valid: false }, 'step mismatch');
    } else if (badInput(element)) {
      this.host._internals.setValidity({ badInput: true, valid: false }, 'bad input');
    } else {
      this.host._internals.setValidity({ valid: true });
    }
  }

  #setValue(e: any, config = { valueType: 'string' }) {
    this.host.value = config.valueType === 'number' ? e.target.valueAsNumber : e.target.value;
  }

  onChange(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.dispatchChange(e);
  }

  onInput(e: InputEvent, config?: { valueType: 'string' | 'number' }) {
    this.#setValue(e, config);
    this.dispatchInput(e);
  }
}
