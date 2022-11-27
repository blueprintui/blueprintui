import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { onKeys, stopEvent } from '../utils/events.js';

export interface TypeButton extends ReactiveElement {
  name: string;
  value: string;
  disabled: boolean;
  readonly: boolean;
  type: 'button' | 'submit';
  readonly form: HTMLFormElement;
  readonly _internals?: ElementInternals;
}

/**
 * Provides nessesary attributes for indicating a non-button element as an accessible button type.
 */
export function typeButton<T extends TypeButton>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeButtonController(instance));
}

export class TypeButtonController<T extends TypeButton> implements ReactiveController {
  constructor(private host: T) {
    attachInternals(this.host);
    this.host.addController(this);
  }

  hostConnected() {
    this.host.tabIndex = 0; // element can be focused synchronously
    if (!Object.prototype.hasOwnProperty.call(this.host, 'form')) {
      Object.defineProperty(this.host, 'form', { get: () => this.host._internals.form });
    }
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#updateFocus();
    this.#updateRole();
    this.#updateType();
    this.#updateReadonly();
    this.#updateEventListeners();    
  }

  #updateRole() {
    if (!this.host._internals.role) {
      this.host._internals.role = 'button';
    }
  }

  #updateType() {
    if (!this.host.type && this.host.closest('form')) {
      this.host.type = 'submit';
    }
  }

  #updateFocus() {
    this.host.tabIndex = !this.host.disabled ? 0 : -1;
  }

  #updateReadonly() {
    if (this.host.readonly) {
      this.host._internals.role = null;
      this.host.tabIndex = null;
      this.host.removeAttribute('tabindex');
    }
  }

  #clickFn = this.#click.bind(this);
  #keyUpFn = this.#keyup.bind(this);

  #updateEventListeners() {
    this.host.removeEventListener('click', this.#clickFn);
    this.host.removeEventListener('keyup', this.#keyUpFn);
    if (!this.host.readonly && !this.host.disabled) {
      this.host.addEventListener('click', this.#clickFn);
      this.host.addEventListener('keyup', this.#keyUpFn);
    }
  }

  #click(event: Event) {
    if (this.host.disabled) {
      stopEvent(event);
    } else if (this.host.type === 'submit') {
      const event = new SubmitEvent('submit', { cancelable: true });
      this.host._internals.form.dispatchEvent(event);
      if (!event.defaultPrevented) {
        this.host._internals.form.submit();
      }
    }
  }

  #keyup(event: KeyboardEvent) {
    onKeys(['Enter', 'Space'], event, () => {
      if (this.host.disabled) {
        stopEvent(event);
      } else {
        this.host.click();
      }
    });
  }
}
