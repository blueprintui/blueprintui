import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaGroup = ReactiveElement & { _internals?: ElementInternals };

export function ariaGroup<T extends AriaGroup>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaGroupController(instance));
}

export class AriaGroupController<T extends AriaGroup> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    this.host._internals.role = 'group';
  }
}
