import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaNavigation = ReactiveElement & { _internals?: ElementInternals };

export function ariaNavigation<T extends AriaNavigation>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaNavigationController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "navigation" to indicate that the element is a navigation landmark
 */
export class AriaNavigationController<T extends AriaNavigation> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    this.host._internals.role = 'navigation';
  }
}
