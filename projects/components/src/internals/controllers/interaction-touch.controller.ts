import { ReactiveElement, ReactiveController } from 'lit';
import { getOffesetDifference } from '../utils/dom.js';
import { dispatchTypedEvent, type InteractionTouchEventMap } from '../events/index.js';

export class TouchCoordinate {
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;

  constructor(event: PointerEvent, startPosition: { x: number; y: number }) {
    this.x = event.clientX;
    this.y = event.clientY;
    this.offsetX = getOffesetDifference(startPosition.x, event.clientX);
    this.offsetY = getOffesetDifference(startPosition.y, event.clientY);
  }
}

export function interactionTouch<T extends ReactiveElement>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) =>
    target.addInitializer((instance: T) => new InteractionTouchController(instance));
}

/**
 * Responsible for handling touch events on a LitElement
 * @event bp-touchstart
 * @event bp-touchmove
 * @event bp-touchend
 */
export class InteractionTouchController<T extends ReactiveElement> implements ReactiveController {
  #startPosition: { x: number; y: number };
  #moveHandler = this.#move.bind(this);
  #endHandler = this.#end.bind(this);

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    console;
    this.host.addEventListener('pointerdown', (e: any) => this.#start(e), { passive: true });
  }

  #start(e: PointerEvent & { path: HTMLElement[] }) {
    if (e.composedPath().find((el: any) => el === this.host)) {
      this.#startPosition = { x: e.clientX, y: e.clientY };
      document.addEventListener('pointerup', this.#endHandler, { passive: true });
      document.addEventListener('pointermove', this.#moveHandler, { passive: true });
      dispatchTypedEvent<InteractionTouchEventMap, 'bp-touchstart'>(this.host as any, 'bp-touchstart', {
        ...this.#startPosition
      });
    }
  }

  #move(e: PointerEvent) {
    requestAnimationFrame(() => {
      const detail = new TouchCoordinate(e, this.#startPosition);
      this.#startPosition = { x: e.clientX, y: e.clientY };
      dispatchTypedEvent<InteractionTouchEventMap, 'bp-touchmove'>(this.host as any, 'bp-touchmove', detail);
    });
  }

  #end(e: PointerEvent) {
    if (this.#startPosition) {
      document.removeEventListener('pointerup', this.#endHandler, false);
      document.removeEventListener('pointermove', this.#moveHandler, false);
      dispatchTypedEvent<InteractionTouchEventMap, 'bp-touchend'>(
        this.host as any,
        'bp-touchend',
        new TouchCoordinate(e, this.#startPosition)
      );
    }
  }
}
