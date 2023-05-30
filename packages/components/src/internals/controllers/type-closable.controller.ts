import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeClosable = ReactiveElement & { closable: boolean };

export function typeClosable<T extends TypeClosable>(): ClassDecorator {
  return (target: any) =>
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
 * responsible for managing the closable behavior of an element
 */
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
