import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeClosable = ReactiveElement & { closable: boolean; };

/**
 * Provides closable interaction behavior to a component.
 */
export function typeClosable<T extends TypeClosable>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T & { typeClosableController?: TypeClosableController<T> }) => {
    if (!instance.typeClosableController) {
      Object.defineProperty(instance, 'typeClosableController', {
        value: new TypeClosableController(instance),
        writable: false
      });
    }

    return instance.typeClosableController;
  });
}

export class TypeClosableController<T extends TypeClosable> implements ReactiveController {
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
