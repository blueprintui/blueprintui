import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';

export type StateTextContent = ReactiveElement & { _internals?: ElementInternals };

export function stateTextContent<T extends StateTextContent>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateTextContentController(instance));
}

/**
 * Responsible for managing the `--text-content` CSS state based on the text content of the element
 */
export class StateTextContentController<T extends StateTextContent> implements ReactiveController {
  #observer: MutationObserver;
  #charCount = 0;

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
    this.host._internals.states.delete('--text-content');
    this.host._internals.states.delete(`--text-content-${this.#charCount}`);
    this.#charCount = this.host.textContent?.trim().length || 0;

    if (this.#charCount) {
      this.host._internals.states.add('--text-content');
      this.host._internals.states.add(`--text-content-${this.#charCount}`);
    }
  }
}
