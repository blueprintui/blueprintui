import { ReactiveController, ReactiveElement } from 'lit';

export function interactionTextChange<T extends ReactiveElement>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new InteractionTextChangeController(instance));
}

/**
 * Responsible for notifying of text node changes of a host element
 * @event bp-textchange
 */
export class InteractionTextChangeController<T extends ReactiveElement> implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.host.addEventListener('DOMCharacterDataModified', () => this.#dispatch());
    this.#observer = new MutationObserver(() => this.#dispatch());
    this.#observer.observe(this.host, { characterData: true, childList: true });
  }

  hostDisconnected() {
    this.#observer?.disconnect();
  }

  #dispatch() {
    this.host.dispatchEvent(new CustomEvent('bp-textchange', { bubbles: true, cancelable: true }));
  }
}
