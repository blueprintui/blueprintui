import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { onKeys } from '../utils/events.js';

type Active = ReactiveElement & { disabled: boolean; readonly?: boolean; _internals?: ElementInternals };

export function stateActive<T extends Active>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new StateActiveController(instance));
}

/**
 * Responsible for adding an --active state to an element when it is in an active state
 * A shim fix for CSS psuedo-selector :active on keydown space/enter for custom elements
 */
export class StateActiveController<T extends Active> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    attachInternals(this.host);
    await this.host.updateComplete;
    this.host.addEventListener('keypress', (e: any) => this.#emulateActive(e));
    this.host.addEventListener('mousedown', (e: any) => this.#emulateActive(e));
    this.host.addEventListener('keyup', () => this.#emulateInactive());
    this.host.addEventListener('blur', () => this.#emulateInactive());
    this.host.addEventListener('mouseup', () => this.#emulateInactive());
  }

  #emulateActive(event: any) {
    if (!this.host.disabled) {
      this.host._internals.states.add('active');
    }

    onKeys(['Enter', 'Space'], event, () => {
      if (!this.host.disabled && !this.host.readonly) {
        event.preventDefault();
      }
    });
  }

  #emulateInactive() {
    this.host._internals.states.delete('active');
  }
}
