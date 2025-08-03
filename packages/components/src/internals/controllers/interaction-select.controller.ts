import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import type { CommandSelectable } from '../types/index.js';

export type InteractionSelect = ReactiveElement & { interaction?: 'auto' | ('single' | 'multi'); selected: boolean };

export function interactionSelect<T extends InteractionSelect>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
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
  #hasCommandTrigger = false;

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);

    this.host.addEventListener('command', (e: CommandEvent<CommandSelectable>) => {
      this.#hasCommandTrigger = true;
      if (e.command === '--select') {
        this.select();
      }

      if (e.command === '--deselect') {
        this.deselect();
      }

      if (e.command === '--toggle') {
        this.toggle();
      }
      this.#hasCommandTrigger = false;
    });
  }

  toggle() {
    if (this.host.interaction || this.#hasCommandTrigger) {
      this.host.selected = !this.host.selected;
    }
  }

  select() {
    if (this.host.interaction || this.#hasCommandTrigger) {
      this.host.selected = true;
    }
  }

  deselect() {
    if (this.host.interaction || this.#hasCommandTrigger) {
      this.host.selected = false;
    }
  }
}
