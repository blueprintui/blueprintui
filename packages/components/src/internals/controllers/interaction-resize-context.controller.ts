import { ReactiveController, ReactiveControllerHost } from 'lit';
import type { BpButtonResize } from '@blueprintui/components/button-resize';
import { parseMinimumTouchWidth } from '../utils/string.js';
import { createCustomEvent } from '../utils/events.js';

export type ResizeContext = ReactiveControllerHost &
  HTMLElement & {
    width: string;
    _internals: ElementInternals;
  };

export interface ResizeContextConfig {
  resizer?: BpButtonResize;
  max?: number;
  min?: number;
}

export function resizeContext<T extends ResizeContext>(fn?: (host: T) => ResizeContextConfig): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new InteractionResizeContextController(instance, fn));
}

/**
 * Responsible for managing the resizing of a LitElement
 */
export class InteractionResizeContextController<T extends ResizeContext> implements ReactiveController {
  #resizer: BpButtonResize;
  #minWidth = 36;

  protected get config(): ResizeContextConfig {
    return {
      resizer: this.host?.querySelector<BpButtonResize>('bp-button-resize'),
      max: parseInt(this.host.width),
      min: this.#minWidth,
      ...this.fn(this.host)
    };
  }

  constructor(
    protected host: T,
    private fn: (host: T) => ResizeContextConfig
  ) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.#minWidth = this.host.width
      ? parseMinimumTouchWidth(this.host.width)
      : this.host.getBoundingClientRect().width;
    this.#resizer = this.config.resizer;

    if (this.#resizer) {
      this.#resizer.slot = 'resize';
      this.#resizer.max = this.config.max;
      this.#resizer.min = this.config.min;
      this.#resizer.value = parseInt(getComputedStyle(this.host).width);
      this.#resizer.addEventListener('input', (e: any) => this.#resize(e.target.valueAsNumber));
      this.#resizer.addEventListener('change', (e: any) => this.#resize(e.target.valueAsNumber));
      this.#resizer.addEventListener('focus', () => this.host._internals.states.add('--resizing'));
      this.#resizer.addEventListener('blur', () => this.host._internals.states.delete('--resizing'));
    }
  }

  async hostUpdated() {
    await this.host.updateComplete;
    if (this.#resizer) {
      this.#resizer.min = this.config.min;
      this.#resizer.value = this.config.max;
    }
  }

  #resize(width: number) {
    this.host.dispatchEvent(
      createCustomEvent('resize-input', { detail: Math.max(this.#minWidth, width), bubbles: true })
    );
  }
}
