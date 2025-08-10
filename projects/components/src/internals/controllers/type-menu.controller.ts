import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type TypeMenu = ReactiveElement & { _internals?: ElementInternals };

export function ariaMenu<T extends TypeMenu>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new TypeMenuController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "menu" to indicate that the element is a menu
 */
export class TypeMenuController<T extends TypeMenu> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.host._internals.role = 'menu';
  }
}

export type AriaMenuItem = ReactiveElement & { _internals?: ElementInternals };

export function ariaMenuItem<T extends TypeMenu>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new AriaMenuItemController(instance));
}

/**
 * Responsible for setting the role attribute of an element to "menuitem" to indicate that the element is a menu item
 */
export class AriaMenuItemController<T extends TypeMenu> implements ReactiveController {
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
