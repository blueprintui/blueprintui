import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type InteractionSelect = ReactiveElement & { interaction?: 'auto' | ('single' | 'multi'); selected: boolean };

export function interactionSelect<T extends InteractionSelect>(): ClassDecorator {
  return (target: any) =>
    target.addInitializer((instance: T & { interactionSelectController?: InteractionSelectController<T> }) => {
      if (!instance.interactionSelectController) {
        Object.defineProperty(instance, 'interactionSelectController', {
          value: new InteractionSelectController(instance),
          writable: false
        });
      }

      return instance.interactionSelectController;
    });
}

/**
 * responsible for managing the closable behavior of an element
 */
export class InteractionSelectController<T extends InteractionSelect> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  select() {
    if (this.host.interaction) {
      this.host.selected = !this.host.selected;
    }
  }
}
