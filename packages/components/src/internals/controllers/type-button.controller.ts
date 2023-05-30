import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export interface TypeButton extends ReactiveElement {
  name: string;
  value: string;
  disabled: boolean;
  readonly: boolean;
  type: 'button' | 'submit';
  readonly form: HTMLFormElement;
  readonly _internals?: ElementInternals;
}

export function typeButton<T extends TypeButton>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeButtonController(instance));
}

/**
 * Responsible for managing the behavior of a element that contains a button.
 * Provides nessesary attributes for indicating a non-button element as an accessible button type.
 */
export class TypeButtonController<T extends TypeButton> implements ReactiveController {
  constructor(private host: T) {
    attachInternals(this.host);
    this.host.addController(this);
  }

  hostConnected() {
    if (!Object.prototype.hasOwnProperty.call(this.host, 'form')) {
      Object.defineProperty(this.host, 'form', { get: () => this.host._internals.form });
    }
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#updateRole();
    this.#updateType();
    this.#updateEventListeners();
  }

  #updateEventListeners() {
    this.host.removeEventListener('click', this.#clickFn);
    if (!this.host.readonly && !this.host.disabled) {
      this.host.addEventListener('click', this.#clickFn);
    }
  }

  #updateRole() {
    if (!this.host._internals.role) {
      this.host._internals.role = 'button';
    }

    if (this.host._internals.role === 'button' && this.host.readonly) {
      this.host._internals.role = null;
    }
  }

  #updateType() {
    if (!this.host.type && this.host.closest('form')) {
      this.host.type = 'submit';
    }
  }

  #clickFn = this.#click.bind(this);

  #click() {
    if (!this.host.disabled && this.host.type === 'submit') {
      const event = new SubmitEvent('submit', { cancelable: true });
      this.host._internals.form.dispatchEvent(event);
      if (!event.defaultPrevented) {
        this.host._internals.form.submit();
      }
    }
  }
}
