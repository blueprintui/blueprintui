import { ReactiveController, ReactiveElement } from 'lit';

/**
 * Default to `content-visibility: auto` for lazy render, on scroll set all row items to `content-visibility: visible` for eager render
 * Enables fast initial render and smooth eager rendering anytime after for items within a bounded scroll box.
 */
export function interactionScrollVisibility<T extends ReactiveElement>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new InteractionScrollVisibilityController(instance));
}

export class InteractionScrollVisibilityController<T extends ReactiveElement> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.host.renderRoot.addEventListener('scroll', () => this.#setVisibility(), { once: true, capture: true });
    this.host.renderRoot.addEventListener('pointerdown', () => this.#setVisibility(), { once: true, capture: true });
  }

  #setVisibility() {
    this.host.style.setProperty('--row-content-visibility', 'visibile');
  }
}
