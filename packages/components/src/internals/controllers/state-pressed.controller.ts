import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StatePressed = ReactiveElement & { pressed: boolean; readonly?: boolean; _internals?: ElementInternals };

export function statePressed<T extends StatePressed>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new StatePressedController(instance));
}

/**
 * Responsible for managing the aria-pressed attribute and the --pressed CSS state
 */
export class StatePressedController<T extends StatePressed> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    if (this.host.pressed !== null && this.host.pressed !== undefined) {
      this.host._internals.ariaPressed = `${this.host.pressed}`;
    }

    if (this.host.pressed) {
      this.host._internals.states.add('pressed');
    } else {
      this.host._internals.states.delete('pressed');
    }

    if (this.host.readonly) {
      this.host._internals.ariaPressed = null;
      this.host._internals.states.delete('pressed');
    }
  }
}
