import { ReactiveController, ReactiveElement } from 'lit';
import { querySelectorByIdRef } from '../utils/dom.js';

export interface CommandTrigger extends ReactiveElement {
  commandForElement: HTMLElement;
  command: string;
  readonly?: boolean;
  disabled?: boolean;
}

/**
 * Provides necessary API for Invoker Command support https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
 */
export function typeCommandTrigger<T extends CommandTrigger>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) => {
    return target.addInitializer((instance: T & { typeCommandTriggerController?: TypeCommandTriggerController<T> }) => {
      if (!instance.typeCommandTriggerController) {
        Object.defineProperty(instance, 'typeCommandTriggerController', {
          value: new TypeCommandTriggerController(instance),
          writable: false
        });
      }

      return instance.typeCommandTriggerController;
    });
  };
}

export class TypeCommandTriggerController<T extends CommandTrigger> implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);

    this.#observer = new MutationObserver(mutations => {
      const element = mutations[0].target as HTMLElement;
      this.host.commandForElement = querySelectorByIdRef(this.host, element.getAttribute('commandfor'));
    });

    this.#observer.observe(this.host, { attributes: true, attributeFilter: ['commandfor'] });
  }

  async hostConnected() {
    await this.host.updateComplete;

    const commandfor = this.host.getAttribute('commandfor');
    if (commandfor) {
      this.host.commandForElement = querySelectorByIdRef(this.host, commandfor);
    }

    this.host.addEventListener('click', () => {
      if (this.host.commandForElement && !this.host.disabled && !this.host.readonly) {
        this.host.commandForElement.dispatchEvent(
          new CommandEvent('command', {
            command: this.host.command,
            source: this.host,
            cancelable: true
          })
        );
      }
    });
  }

  async hostDisconnected() {
    this.#observer.disconnect();
  }
}
