import { ReactiveController, ReactiveElement } from 'lit';
import { listenForAttributeChange } from '../utils/events.js';

export type StateScrollock = ReactiveElement;

export function stateScrollLock<T extends StateScrollock>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateScrollLockController(instance));
}

/**
 * Responsible for managing the scroll lock behavior of the body element when a element is hidden
 */
export class StateScrollLockController<T extends StateScrollock> implements ReactiveController {
  #observers: MutationObserver[] = [];

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    this.#observers.push(
      listenForAttributeChange(this.host, 'hidden', () => {
        if (this.host.hasAttribute('hidden')) {
          document.body.style.overflow = '';
        } else {
          document.body.style.overflow = 'hidden';
        }
      })
    );
  }

  hostDisconnected() {
    document.body.style.overflow = '';
    this.#observers.forEach(observer => observer.disconnect());
  }
}
