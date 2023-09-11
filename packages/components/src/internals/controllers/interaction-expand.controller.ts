import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';

export type InteractionExpand = ReactiveElement & {
  interactionExpandControllerConfig?: InteractionExpandConfig;
  interaction?: 'auto';
  expanded: boolean;
};

export interface InteractionExpandConfig {
  keynav?: 'inline' | 'block';
}

export function interactionExpand<T extends InteractionExpand>(
  fn?: (host: T) => InteractionExpandConfig
): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T & { interactionExpandController?: InteractionExpandController<T> }) => {
      if (!instance.interactionExpandController) {
        Object.defineProperty(instance, 'interactionExpandController', {
          value: new InteractionExpandController(instance),
          writable: false
        });
      }

      if (!instance.interactionExpandControllerConfig) {
        Object.defineProperty(instance, 'interactionExpandControllerConfig', {
          get() {
            return fn ? fn(instance) : {};
          }
        });
      }

      return instance.interactionExpandController;
    });
}

/**
 * @event open
 * @event close
 * responsible for managing the closable behavior of an element
 */
export class InteractionExpandController<T extends InteractionExpand> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.#setupKeynav();
  }

  toggle() {
    if (this.host.expanded) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    if (this.host.interaction === 'auto') {
      this.host.expanded = true;
    }

    this.host.dispatchEvent(createCustomEvent('open'));
  }

  close() {
    if (this.host.interaction === 'auto') {
      this.host.expanded = false;
    }

    this.host.dispatchEvent(createCustomEvent('close'));
  }

  #setupKeynav() {
    if (this.host.interactionExpandControllerConfig.keynav === 'inline') {
      this.host.addEventListener('keyup', e => {
        if (e.target === this.host) {
          if (e.code === 'ArrowRight') {
            this.open();
          }

          if (e.code === 'ArrowLeft') {
            this.close();
          }
        }
      });
    }
  }
}
