import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';
import { querySelectorByIdRef } from '../utils/dom.js';
import { createId } from '../utils/string.js';

export interface PopoverControllerConfig {
  focusTrap?: boolean;
  closeOnScroll?: boolean;
  open?: boolean;
  static?: boolean;
  type?: 'auto' | 'manual' | 'hint';
  anchor?: HTMLElement | string;
}

export interface Popover extends ReactiveElement {
  typePopoverControllerConfig?: PopoverControllerConfig;
  _internals?: ElementInternals;
}

/**
 * Provides necessary API for popover types
 * https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 */
export function typePopover<T extends Popover>(fn?: (host: T) => PopoverControllerConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T & { typePopoverController?: TypePopoverController<T> }) => {
      if (!instance.typePopoverControllerConfig) {
        Object.defineProperty(instance, 'typePopoverControllerConfig', {
          get() {
            return fn(instance);
          }
        });
      }

      return new TypePopoverController(instance);
    });
  };
}

export class TypePopoverController<T extends Popover> implements ReactiveController {
  get #config(): PopoverControllerConfig {
    return this.host.typePopoverControllerConfig;
  }

  #source: HTMLElement | null = null;

  get #anchor(): HTMLElement {
    if (typeof this.#config.anchor === 'string' && this.#config.anchor?.length) {
      return querySelectorByIdRef(this.host, this.#config.anchor);
    } else if (this.#config.anchor) {
      return this.#config.anchor as HTMLElement;
    } else if (this.#source) {
      return this.#source;
    } else {
      return document.body;
    }
  }

  constructor(private host: T) {
    this.host.addController(this);
    attachInternals(this.host);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.#setupPopoverType();
    this.#setupScrollListener();
    this.#setupFocusTrap();
    this.#setupToggleEvents();
    this.#setupCommandEvents();
    this.#setupInterestEvents();

    if (this.#config.open) {
      this.host.showPopover();
    }

    await new Promise(r => requestAnimationFrame(() => r('')));
    this.host._internals.states.add('popover-ready');
  }

  hostDisconnected() {
    this.#removeScrollListener();
  }

  #setupPopoverType() {
    if (!this.#config.static) {
      this.host.popover = this.#config.type;
    }
  }

  #setupCSSAnchorPosition() {
    if (!this.#anchor.style.anchorName) {
      this.#anchor.style.anchorName = `--${createId()}`;
    }
    this.host.style.positionAnchor = this.#anchor.style.anchorName;
  }

  #setupToggleEvents() {
    this.host.addEventListener('beforetoggle', (e: ToggleEvent) => {
      this.#source = e.source as HTMLElement;
      if (e.newState === 'open') {
        this.#setupCSSAnchorPosition();
      }

      this.host.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
    });
  }

  #setupCommandEvents() {
    this.host.addEventListener('command', (e: CommandEvent) => {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source.localName.includes('-');
      if (isCustomElement) {
        if (e.command === 'toggle-popover') {
          this.host.togglePopover({ source: this.#source as HTMLElement });
        } else if (e.command === 'show-popover') {
          this.host.showPopover({ source: this.#source as HTMLElement });
        } else if (e.command === 'hide-popover') {
          this.host.hidePopover();
        }
      }
    });
  }

  #setupInterestEvents() {
    this.host.addEventListener('interest' as any, (e: any) => {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');
      if (isCustomElement) {
        this.host.showPopover({ source: this.#source as HTMLElement });
      }
    });

    this.host.addEventListener('loseinterest' as any, (e: any) => {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');
      if (isCustomElement) {
        this.host.hidePopover();
      }
    });
  }

  #scrollFn = () => {
    if (this.host.matches(':popover-open')) {
      this.host.hidePopover();
    }
  };

  #setupScrollListener() {
    if (this.#config.closeOnScroll) {
      document.addEventListener('scroll', this.#scrollFn);
    }
  }

  #removeScrollListener() {
    document.removeEventListener('scroll', this.#scrollFn);
  }

  #setupFocusTrap() {
    if (this.#config.focusTrap) {
      createFocusTrap(this.host);
      this.#setupFocusFirst();
    }
  }

  #setupFocusFirst() {
    this.host.addEventListener('toggle', (e: any) => {
      if (e.newState === 'open') {
        getFlattenedFocusableItems(this.host)[0]?.focus();
      }
    });
  }
}
