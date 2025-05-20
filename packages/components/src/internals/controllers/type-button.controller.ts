import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { querySelectorByIdRef } from '../utils/dom.js';

export interface TypeButton extends ReactiveElement {
  name: string;
  value: string;
  disabled: boolean;
  readonly: boolean;
  type: 'button' | 'submit' | 'reset';
  commandFor: string;
  command: string;
  readonly form: HTMLFormElement;
  readonly _internals?: ElementInternals;
  _form?: HTMLFormElement /* @private */;
}

export function typeButton<T extends TypeButton>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new TypeButtonController(instance));
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
      Object.defineProperty(this.host, 'form', {
        get: () => (this.host._form ? this.host._form : this.host._internals.form),
        set: (form: string | HTMLFormElement) => {
          if (typeof form === 'string') {
            this.host._form = (this.host.getRootNode() as ShadowRoot).querySelector(`#${form}`);
          } else {
            this.host._form = form;
          }
        }
      });
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
    if (this.host.type === 'submit' && !this.host.disabled && this.host.form) {
      this.#setupSubmitter();
      this.host.form.appendChild(this.#submitter);
      this.host.form.requestSubmit(this.#submitter); // https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
    } else if (this.host.type === 'reset' && this.host.form) {
      this.host.form.reset();
    }

    if (this.host.commandFor) {
      const commandFor = querySelectorByIdRef(this.host, this.host.commandFor);
      commandFor?.dispatchEvent(
        new (globalThis as any).CommandEvent('command', { command: this.host.command, source: this.host })
      );
    }
  }

  // https://github.com/WICG/webcomponents/issues/814
  #submitter: HTMLButtonElement | null = null;
  #setupSubmitter() {
    if (!this.#submitter) {
      this.#submitter = document.createElement('button');
      this.#submitter.style.display = 'none';
      this.#submitter.value = this.host.value ?? '';
      this.#submitter.name = this.host.name ?? '';
      this.#submitter.type = 'submit';
    } else {
      this.host.form.addEventListener('submit', () => setTimeout(() => this.#submitter.remove(), 0), { once: true });
    }
  }
}
