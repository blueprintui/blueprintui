import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { getParents } from '../utils/traversal.js';

type Direction = ReactiveElement & { dir: 'ltr' | 'rtl' | 'auto' | ''; _internals?: ElementInternals };

export function stateDirection<T extends Direction>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new StateDirectionController(instance));
}

/**
 * Responsible for setting the direction CSS state of a LitElement based on the dir attribute of the host element or its parent elements.
 * Shim for CSS dir() behavior https://developer.mozilla.org/en-US/docs/Web/CSS/:dir
 */
export class StateDirectionController<T extends Direction> implements ReactiveController {
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    attachInternals(this.host);
    this.#updateState();
    this.#observer = new MutationObserver(() => this.#updateState());
    this.#observer.observe(document.getRootNode(), {
      attributes: true,
      childList: false,
      subtree: false,
      attributeFilter: ['dir']
    });
  }

  hostUpdated() {
    this.#updateState();
  }

  hostDisconnected() {
    this.#observer?.disconnect();
  }

  #updateState() {
    this.host._internals.states.delete('--dir-ltr');
    this.host._internals.states.delete('--dir-rtl');
    this.host._internals.states.delete('--dir-auto');

    const dir = [this.host, ...getParents(this.host)].find(el => el.hasAttribute('dir'))?.getAttribute('dir');
    if (dir) {
      this.host._internals.states.add(`--dir-${dir}`);
    }
  }
}
