import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeRegion = ReactiveElement & { _internals?: ElementInternals };

export function typeRegion<T extends TypeRegion>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new TypeRegionController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "region" to indicate that the element is a region landmark
 */
export class TypeRegionController<T extends TypeRegion> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host._internals.role = 'region';
  }
}
