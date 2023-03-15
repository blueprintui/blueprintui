import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateTextContent = ReactiveElement & { _internals?: ElementInternals };

export function stateTextContent<T extends StateTextContent>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateTextContentController(instance));
}

export class StateTextContentController<T extends StateTextContent> implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.#updateState();
    this.#observer = new MutationObserver(() => this.#updateState());
    this.#observer.observe(this.host, { characterData: false, attributes: false, childList: true, subtree: false });
  }

  hostDisconnected() {
    this.#observer.disconnect();
  }

  #updateState() {
    if (this.host.textContent?.trim().length) {
      this.host._internals.states.add('--text-content');
    } else {
      this.host._internals.states.delete('--text-content');
    }
  }
}
