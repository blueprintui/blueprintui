import { ReactiveController, ReactiveElement } from 'lit';
import { computePosition, autoUpdate, flip, offset, arrow, Placement } from '@floating-ui/dom';
import { querySelectorByIdRef } from '../utils/dom.js';
import { listenForAttributeChange } from '../utils/events.js';

const ARROW_OFFSET = -10;
const ARROW_PADDING = 4;

export declare type Alignment = 'start' | 'end';
export declare type Side = 'top' | 'right' | 'bottom' | 'left';
export declare type AlignedPosition = `${Side}-${Alignment}`;
export declare type Position = Side | AlignedPosition | 'center';

(window as any).process = { env: { NODE_ENV: 'production' } }; // floating-ui

export interface TypePositioned extends ReactiveElement {
  typePositionedControllerConfig?: TypePositionedConfig;
}

export interface TypePositionedConfig {
  popover: HTMLElement;
  position: Position;
  anchorOffset?: number;
  anchor?: HTMLElement | string;
  arrow?: HTMLElement;
  scroll?: boolean;
  flip?: boolean;
}

export function typePositioned<T extends TypePositioned>(fn?: (host: T) => TypePositionedConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T & { typePositionedController?: TypePositionedController<T> }) => {
      if (!instance.typePositionedController) {
        Object.defineProperty(instance, 'typePositionedController', {
          value: new TypePositionedController(instance),
          writable: false
        });
      }

      if (!instance.typePositionedControllerConfig) {
        Object.defineProperty(instance, 'typePositionedControllerConfig', {
          get() { return fn(instance); }
        });
      }

      return instance.typePositionedController;
    });
  };
}

export class TypePositionedController<T extends TypePositioned> implements ReactiveController {
  #subscription: () => void;

  get #config() {
    return {
      flip: true,
      scroll: true,
      anchorOffset: 12,
      ...this.host.typePositionedControllerConfig
    };
  }

  get #popover() {
    return this.#config.popover ? this.#config.popover : this.host;
  }

  get #anchor() {
    if (typeof this.#config.anchor === 'string') {
      return querySelectorByIdRef(this.host, this.#config.anchor);
    } else if (this.#config.anchor) {
      return this.#config.anchor;
    } else {
      return document.body;
    }
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;

    if (!this.#subscription) {
      this.#subscription = autoUpdate(this.#anchor, this.#popover, () => this.#computePosition(), { ancestorScroll: this.#config.scroll });
    }

    listenForAttributeChange(this.host, 'hidden', () => {
      this.#toggleScroll();
      this.#computePosition();
    });
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#computePosition();
  }

  hostDisconnected() {
    if (this.#subscription) {
      this.#subscription();
    }
  }

  #computePosition() {
    if (!this.host.hidden) {
      const config: any = {
        placement: this.#config.position,
        middleware: [this.#getOffset(), ...this.#config.flip ? [flip()] : [], ...this.#config.arrow ? [arrow({ element: this.#config.arrow, padding: ARROW_PADDING })] : []]
      };

      this.#setPosition(config);
    }
  }

  #toggleScroll() {
    if (!this.host.hidden && this.#config.scroll !== true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'initial';
    }
  }

  async #setPosition(config: { placement: Placement, middleware: any[] }) {
    await this.host.updateComplete;
    await new Promise(r => requestAnimationFrame(() => r('')));
    const position = await computePosition(this.#anchor, this.#popover, config);
    this.#config.position = position.placement;
    this.#setPopoverPosition(position.x, position.y);

    if (position.middlewareData.arrow) {
      this.#setArrowPosition(position.middlewareData.arrow.x, position.middlewareData.arrow.y, position.placement);
    }
  }

  #setPopoverPosition(x: number, y: number) {
    Object.assign(this.#popover.style, { position: 'fixed', left: `${x}px`, top: `${y}px`, margin: 0 });
  }

  #setArrowPosition(x: number, y: number, placement: string) {
    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[placement.split('-')[0]];

    Object.assign(this.#config.arrow.style, {
      left: x !== null ? `${x}px` : '',
      top: y !== null ? `${y}px` : '',
      right: '',
      bottom: '',
      [staticSide]: `${ARROW_OFFSET}px`,
    });
  }

  #getOffset() {
    if (this.#anchor === document.body) {
      return this.#getBodyOffset();
    } else if (this.#config.position === 'center') {
      return offset(({ rects }) => ({ mainAxis: rects.reference.width / 2 - rects.floating.width / 2, crossAxis: rects.reference.height / 2 - rects.floating.height / 2 }));
    } else if (this.#config.arrow) {
      return offset(this.#config.anchorOffset);
    } else {
      return offset(0);
    }
  }

  #getBodyOffset() {
    return offset(({ rects }) => {
      const config = this.#config;
      if (this.#config.position === 'center') {
        return { mainAxis: window.innerWidth / 2 - rects.floating.width / 2, crossAxis: (window.innerHeight / 2 - rects.floating.height / 2) + window.scrollY };
      } else if (this.#config.position.includes('top') || this.#config.position.includes('bottom')) {
        let crossAxis = 0;
        if (this.#config.position.includes('start')) {
          crossAxis = config.anchorOffset;
        }

        if (this.#config.position.includes('end')) {
          crossAxis = rects.reference.width - rects.floating.width - config.anchorOffset;
        }

        return { mainAxis: -rects.floating.height - config.anchorOffset, crossAxis };
      } else if (this.#config.position.includes('left') || this.#config.position.includes('right')) {
        let crossAxis = 0;
        if (this.#config.position.includes('start')) {
          crossAxis = config.anchorOffset;
        }

        if (this.#config.position.includes('end')) {
          crossAxis = rects.reference.height - rects.floating.height - config.anchorOffset;
        }

        return { mainAxis: -rects.floating.width - config.anchorOffset, crossAxis };
      } else {
        return { };
      }
    });
  }
}
