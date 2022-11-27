import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type AriaMenu = ReactiveElement & { _internals?: ElementInternals; };

export function ariaMenu<T extends AriaMenu>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaMenuController(instance));
}

export class AriaMenuController<T extends AriaMenu> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    this.host._internals.role = 'menu';
  }
}

export type AriaMenuItem = ReactiveElement & { _internals?: ElementInternals; };

export function ariaMenuItem<T extends AriaMenu>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new AriaMenuItemController(instance));
}

export class AriaMenuItemController<T extends AriaMenu> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
  }

  hostUpdated() {
    this.host._internals.role = 'menuitem';
  }
}
