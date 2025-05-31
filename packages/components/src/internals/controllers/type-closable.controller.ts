import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent, eventWasDefaultPrevented } from '../utils/events.js';
import { queryCommandTriggerRef } from '../utils/dom.js';

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

    this.host.addEventListener('command', e => {
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
    const event = createCustomEvent('close');
    this.host.dispatchEvent(event);

    if (!(await eventWasDefaultPrevented(event)) && this.#hasCommandTrigger) {
      this.host.hidden = true;
    }
  }

  async open() {
    const event = createCustomEvent('open');
    this.host.dispatchEvent(event);

    if (!(await eventWasDefaultPrevented(event)) && this.#hasCommandTrigger) {
      this.host.hidden = false;
    }
  }
}
