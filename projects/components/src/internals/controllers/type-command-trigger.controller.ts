import { ReactiveController, ReactiveElement } from 'lit';
import { querySelectorByIdRef } from '../utils/dom.js';

export interface CommandTrigger extends ReactiveElement {
  commandFor: string;
  command: string;
  readonly?: boolean;
  disabled?: boolean;
}

/**
 * Provides nessesary API for Invoker Command support https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API
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
  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.host.addEventListener('click', () => {
      if (this.host.commandFor && !this.host.disabled && !this.host.readonly) {
        const commandFor = querySelectorByIdRef(this.host, this.host.commandFor);
        commandFor?.dispatchEvent(
          new (globalThis as any).CommandEvent('command', { command: this.host.command, source: this.host })
        );
      }
    });
  }
}
