import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { eventWasDefaultPrevented } from '../utils/events.js';
import { queryCommandTriggerRef } from '../utils/dom.js';
import { dispatchTypedEvent, type TypeClosableEventMap } from '../events/index.js';
import type { CommandClosable } from '../types/index.js';

export type TypeClosable = ReactiveElement & { _internals?: ElementInternals; closable: boolean; hidden: boolean };

export function typeClosable<T extends TypeClosable>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T & { typeClosableController?: TypeClosableController<T> }) => {
      if (!instance.typeClosableController) {
        Object.defineProperty(instance, 'typeClosableController', {
          value: new TypeClosableController(instance),
          writable: false
        });
      }

      return instance.typeClosableController;
    });
}

/**
 * Responsible determining if the element is closable
 *
 * @event close
 * @event open
 * @command --toggle
 * @command --close
 * @command --open
 * @cssstate open
 * @cssstate close
 */
export class TypeClosableController<T extends TypeClosable> implements ReactiveController {
  get #hasCommandTrigger() {
    return !!queryCommandTriggerRef(this.host);
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);

    this.host.addEventListener('command', (e: CommandEvent<CommandClosable>) => {
      if (e.command === '--toggle') {
        this.toggle();
      }

      if (e.command === '--close') {
        this.close();
      }

      if (e.command === '--open') {
        this.open();
      }
    });
  }

  hostUpdated() {
    this.host._internals.states.delete('open');
    this.host._internals.states.delete('close');

    if (this.host.hidden) {
      this.host._internals.states.add('close');
      this.host._internals.ariaHidden = 'true';
    } else {
      this.host._internals.states.add('open');
      this.host._internals.ariaHidden = 'false';
    }
  }

  async toggle() {
    if (this.host.hidden) {
      await this.open();
    } else {
      await this.close();
    }
  }

  async close() {
    const event = dispatchTypedEvent<TypeClosableEventMap, 'close'>(this.host as any, 'close');

    if (!(await eventWasDefaultPrevented(event)) && this.#hasCommandTrigger) {
      this.host.hidden = true;
    }
  }

  async open() {
    const event = dispatchTypedEvent<TypeClosableEventMap, 'open'>(this.host as any, 'open');

    if (!(await eventWasDefaultPrevented(event)) && this.#hasCommandTrigger) {
      this.host.hidden = false;
    }
  }
}
