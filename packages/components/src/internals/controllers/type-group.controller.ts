import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeGroup = ReactiveElement & { _internals?: ElementInternals };

export function typeGroup<T extends TypeGroup>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeGroupController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "group" to indicate that the element is a group of related elements
 */
export class TypeGroupController<T extends TypeGroup> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host._internals.role = 'group';
  }
}
