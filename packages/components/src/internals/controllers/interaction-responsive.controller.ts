import { ReactiveController, ReactiveElement } from 'lit';

interface ResponsiveConfig {
  skipFirst?: boolean;
  element?: HTMLElement;
}

export function interactionResponsive<T extends ReactiveElement>(
  config: ResponsiveConfig = { skipFirst: false }
): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new InteractionResponsiveController(instance, config));
}

/**
 * Responsible for managing the responsive behavior of a LitElement. Provides a `resize-layout` event when component dimensions are resized
 */
export class InteractionResponsiveController<T extends ReactiveElement> implements ReactiveController {
  #observer: ResizeObserver;
  #resizeElement: HTMLElement;
  #skipFirst = false;

  constructor(
    private host: T,
    config: ResponsiveConfig = { skipFirst: false }
  ) {
    this.host.addController(this);
    this.#skipFirst = !!config.skipFirst;
    this.#resizeElement = config.element ? config.element : this.host;
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#observer = new ResizeObserver(entries => {
      window.requestAnimationFrame(() => {
        if (this.#skipFirst) {
          this.#skipFirst = false;
        } else {
          (this.host as unknown as HTMLElement).dispatchEvent(
            new CustomEvent('resize-layout', { detail: entries[0].contentRect })
          );
          this.host.requestUpdate();
        }
      });
    });

    this.#observer.observe(this.#resizeElement);
  }

  hostDisconnected() {
    this.#observer?.disconnect();
  }
}
