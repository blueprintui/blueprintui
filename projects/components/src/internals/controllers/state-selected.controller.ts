import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateSelected = ReactiveElement & { selected: boolean; readonly?: boolean; _internals?: ElementInternals };

export function stateSelected<T extends StateSelected>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new StateSelectedController(instance));
}

/**
 * Responsible for managing the aria-selected attribute and the --selected CSS state of a element
 */
export class StateSelectedController<T extends StateSelected> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.selected !== null && this.host.selected !== undefined) {
      this.host._internals.ariaSelected = `${this.host.selected}`;
    }

    if (this.host.selected) {
      this.host._internals.states.add('selected');
    } else {
      this.host._internals.states.delete('selected');
    }

    if (this.host.readonly) {
      this.host._internals.ariaSelected = null;
    }
  }
}
