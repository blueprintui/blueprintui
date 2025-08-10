import { ReactiveController, ReactiveElement } from 'lit';
import { attachInternals } from '../utils/a11y.js';
import { onKeys, stopEvent } from '../utils/events.js';

export type InteractionClick = ReactiveElement & {
  disabled: boolean;
  readonly?: boolean;
  _internals?: ElementInternals;
};

export function interactionClick<T extends InteractionClick>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new InteractionClickController(instance));
}

/**
 * Responsible for managing the click interaction of a LitElement
 * - click event
 * - space/enter keyup event
 * - disabled state
 * - readonly state
 * - tabindex state
 */
export class InteractionClickController<T extends InteractionClick> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  hostConnected() {
    this.host.tabIndex = 0; // element can be focused synchronously
    attachInternals(this.host);
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#updateFocus();
    this.#updateReadonly();
    this.#updateEventListeners();
  }

  #clickFn = this.#click.bind(this);
  #keyUpFn = this.#keyup.bind(this);

  #updateEventListeners() {
    this.host.removeEventListener('click', this.#clickFn);
    this.host.removeEventListener('keyup', this.#keyUpFn);
    if (!this.host.readonly && !this.host.disabled) {
      this.host.addEventListener('click', this.#clickFn);
      this.host.addEventListener('keyup', this.#keyUpFn);
    }
  }

  #updateFocus() {
    this.host.tabIndex = !this.host.disabled ? 0 : -1;
  }

  #updateReadonly() {
    if (this.host.readonly) {
      this.host.tabIndex = null;
      this.host.removeAttribute('tabindex');
    }
  }

  #click(event: Event) {
    if (this.host.disabled) {
      stopEvent(event);
    }
  }

  #keyup(event: KeyboardEvent) {
    onKeys(['Enter', 'Space'], event, () => {
      stopEvent(event);
      if (!this.host.disabled) {
        this.host.click();
      }
    });
  }
}
