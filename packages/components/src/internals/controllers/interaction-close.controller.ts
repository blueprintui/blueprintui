import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type InteractionClose = ReactiveElement & { closable: boolean };

export function interactionClose<T extends InteractionClose>(): ClassDecorator {
  return (target: any) =>
    target.addInitializer((instance: T & { interactionCloseController?: InteractionCloseController<T> }) => {
      if (!instance.interactionCloseController) {
        Object.defineProperty(instance, 'interactionCloseController', {
          value: new InteractionCloseController(instance),
          writable: false
        });
      }

      return instance.interactionCloseController;
    });
}

/**
 * responsible for managing the closable behavior of an element
 */
export class InteractionCloseController<T extends InteractionClose> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  close() {
    if (this.host.closable) {
      this.host.dispatchEvent(new CustomEvent('close'));
    }
  }
}
