import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateChecked = ReactiveElement & {
  checked: boolean;
  indeterminate?: boolean;
  readonly?: boolean;
  _internals?: ElementInternals;
};

export function stateChecked<T extends StateChecked>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateCheckedController(instance));
}

/**
 * Responsible for managing the aria-checked attribute and the --checked CSS state
 */
export class StateCheckedController<T extends StateChecked> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.checked !== null && this.host.checked !== undefined) {
      this.host._internals.ariaChecked = `${this.host.checked}`;
    }

    if (this.host.checked) {
      this.host._internals.states.add('--checked');
    } else {
      this.host._internals.states.delete('--checked');
    }

    if (this.host.indeterminate) {
      this.host._internals.states.add('--indeterminate');
    } else {
      this.host._internals.states.delete('--indeterminate');
    }
  }
}
