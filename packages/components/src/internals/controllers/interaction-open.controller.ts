import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';

export type InteractionOpen = ReactiveElement;

export function interactionOpen<T extends InteractionOpen>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T & { interactionOpenController?: InteractionOpenController<T> }) => {
      if (!instance.interactionOpenController) {
        Object.defineProperty(instance, 'interactionOpenController', {
          value: new InteractionOpenController(instance),
          writable: false
        });
      }

      return instance.interactionOpenController;
    });
}

/**
 * responsible for managing the closable behavior of an element
 */
export class InteractionOpenController<T extends InteractionOpen> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  open() {
    this.host.dispatchEvent(createCustomEvent('open'));
  }
}
