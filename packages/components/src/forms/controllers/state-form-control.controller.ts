import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals, toggleState, getElementUpdates } from '@blueprintui/components/internals';

export type Validity = 'valid' | 'invalid' | '';

/**
 * Tracks native form control state and applies states to host custom element.
 */
export type StateFormControl = ReactiveElement & {
  inputControl?: HTMLInputElement;
  _internals?: ElementInternals;
  checked?: boolean;
};

export function stateFormControl<T extends StateFormControl>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateControlController(instance));
}

export class StateControlController<T extends StateFormControl> implements ReactiveController {
  #observers: (MutationObserver | ResizeObserver)[] = [];

  get #input() {
    return (this.host.inputControl ? this.host.inputControl : this.host) as HTMLInputElement;
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    attachInternals(this.host);
    await this.host.updateComplete;

    this.#input.addEventListener('blur', () => {
      this.#updateValidity();
      this.host._internals.states.add('--touched');
    });

    this.#input.addEventListener('input', () => {
      this.#updateValidity();
      this.host._internals.states.add('--dirty');
    });

    this.#input.addEventListener('change', () => {
      toggleState(this.host._internals, '--checked', this.host.checked);
      this.host.requestUpdate();
    });

    this.#observers.push(
      getElementUpdates(this.#input, 'size', value => {
        toggleState(this.host._internals, '--size', value === '' ? true : value);
        this.host.requestUpdate();
      }),

      getElementUpdates(this.#input, 'multiple', value => {
        toggleState(this.host._internals, '--multiple', value === '' ? true : value);
        this.host.requestUpdate();
      }),

      getElementUpdates(this.#input, 'readonly', value => {
        toggleState(this.host._internals, '--readonly', value === '');
        this.host.requestUpdate();
      }),

      getElementUpdates(this.#input, 'checked', value => {
        toggleState(this.host._internals, '--checked', value === '' ? true : value);
        this.host.requestUpdate();
      }),

      getElementUpdates(this.#input, 'aria-disabled', value => {
        toggleState(this.host._internals, '--disabled', value === 'true');
        this.host.requestUpdate();
      }),

      getElementUpdates(this.#input, 'disabled', value => {
        toggleState(this.host._internals, '--disabled', value === '' ? true : value);
        this.host.requestUpdate();
      })
    );
  }

  hostDisconnected() {
    this.#observers.forEach(observer => observer.disconnect());
  }

  #updateValidity() {
    this.#input.checkValidity();

    if (this.#input.validity.valid) {
      this.host._internals.states.add('--valid');
      this.host._internals.states.delete('--invalid');
    } else {
      this.host._internals.states.add('--invalid');
      this.host._internals.states.delete('--valid');
    }

    this.host.requestUpdate();
  }
}
