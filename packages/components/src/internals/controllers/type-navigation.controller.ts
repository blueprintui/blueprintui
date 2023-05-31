import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeNavigation = ReactiveElement & { _internals?: ElementInternals };

export function typeNavigation<T extends TypeNavigation>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeNavigationController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "navigation" to indicate that the element is a navigation landmark
 */
export class TypeNavigationController<T extends TypeNavigation> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host._internals.role = 'navigation';
  }
}
