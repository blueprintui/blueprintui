import { ReactiveController, ReactiveElement } from 'lit';
import type { ConstructorTypeOf } from '../types';

export function dynamicControllers<T extends ReactiveElement>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new DynamicControllers(instance));
}

/**
 * Responsible for dynamically initializing controllers that are added to the static _controllers property of a given element
 */
export class DynamicControllers<T extends ReactiveElement> implements ReactiveController {
  #instances = new Set<ConstructorTypeOf<ReactiveController>>();

  get #hostConstructor() {
    return this.host.constructor as ConstructorTypeOf<ReactiveController> & {
      _controllers: Set<ConstructorTypeOf<ReactiveController>>;
    };
  }

  get #hostControllers() {
    return Array.from(this.#hostConstructor._controllers) as ConstructorTypeOf<ReactiveController>[];
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#hostConstructor._controllers ??= new Set();
    this.sync();
  }

  sync() {
    this.#hostControllers
      .filter(C => !this.#instances.has(C))
      .forEach(C => {
        this.#instances.add(C);
        new C(this.host);
      });
  }

  static add(hostClass: any, Controller: any) {
    hostClass._controllers ??= new Set();
    if (!hostClass._controllers.has(Controller)) {
      hostClass._controllers.add(Controller);
    }
  }
}
