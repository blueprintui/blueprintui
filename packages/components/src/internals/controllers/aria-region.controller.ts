import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaRegion = ReactiveElement & { _internals?: ElementInternals };

export function ariaRegion<T extends AriaRegion>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaRegionController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "region" to indicate that the element is a region landmark
 */
export class AriaRegionController<T extends AriaRegion> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    this.host._internals.role = 'region';
  }
}
