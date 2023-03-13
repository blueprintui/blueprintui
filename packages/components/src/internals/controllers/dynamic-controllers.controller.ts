import { ReactiveController, ReactiveElement } from 'lit';

export function dynamicControllers<T extends ReactiveElement>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new DynamicControllers(instance));
}

export class DynamicControllers<T extends ReactiveElement> implements ReactiveController {
  #instances = new Set<ReactiveController>();

  get #hostConstructor() {
    return this.host.constructor as any;
  }

  get #hostControllers() {
    return Array.from(this.#hostConstructor._controllers) as any[];
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
