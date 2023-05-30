import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateReadonly = ReactiveElement & { readonly: boolean; _internals?: ElementInternals };

export function stateReadonly<T extends StateReadonly>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateReadonlyController(instance));
}

/**
 * Responsible for managing the --readonly CSS state
 */
export class StateReadonlyController<T extends StateReadonly> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.readonly) {
      this.host._internals.states.add('--readonly');
    } else {
      this.host._internals.states.delete('--readonly');
    }
  }
}
