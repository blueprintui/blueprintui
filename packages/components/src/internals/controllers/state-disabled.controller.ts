import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateDisabled = ReactiveElement & { disabled: boolean; readonly?: boolean; _internals?: ElementInternals };

export function stateDisabled<T extends StateDisabled>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateDisabledController(instance));
}

/**
 * Responsible for managing the disabled state of a LitElement.
 * Provides all nessesary aria-* attributes to create valid disabled state for interactive components.
 */
export class StateDisabledController<T extends StateDisabled> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.disabled !== null && this.host.disabled !== undefined) {
      this.host._internals.ariaDisabled = `${this.host.disabled}`;
    }

    if (this.host.disabled) {
      this.host._internals.states.add('--disabled');
    } else {
      this.host._internals.states.delete('--disabled');
    }

    if (this.host.readonly) {
      this.host._internals.ariaDisabled = null;
      this.host._internals.states.delete('--disabled');
    }
  }
}
