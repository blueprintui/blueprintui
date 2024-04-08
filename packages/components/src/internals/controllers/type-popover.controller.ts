import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { getFlattenedDOMTree } from '../utils/traversal.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';

export interface PopoverControllerConfig {
  focusTrap?: boolean;
  closeOnScroll?: boolean;
  lightDismiss?: boolean;
  trigger?: HTMLElement | string;
  open?: boolean;
  static?: boolean;
  type?: 'auto' | 'manual' | 'hint';
}

export interface Popover extends ReactiveElement {
  typePopoverControllerConfig?: PopoverControllerConfig;
  _internals?: ElementInternals;
}

/**
 * Provides nessesary API for popover types
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

  get #trigger() {
    const id = typeof this.#config.trigger === 'string' ? this.#config.trigger : this.#config.trigger?.id;
    const trigger = getFlattenedDOMTree(this.host.parentNode)
      .filter(e => e?.id !== '')
      .find(e => e.id === id);
    return trigger;
  }

  constructor(private host: T) {
    this.host.addController(this);
    attachInternals(this.host);
  }

  async hostConnected() {
    await this.host.updateComplete;

    if (!this.#config.static) {
      this.host.popover = this.#config.type !== 'auto' ? 'manual' : 'auto';
    }

    this.#listenForScroll();
    this.#setupTrigger();
    this.#setupFocusTrap();
    this.#setupToggleEvents();

    if (this.#config.open) {
      await new Promise(r => requestAnimationFrame(() => r('')));
      this.host.showPopover();
    }

    await new Promise(r => requestAnimationFrame(() => r('')));
    this.host._internals.states.add('popover-ready');
  }

  #setupToggleEvents() {
    this.host.addEventListener('beforetoggle', (e: any) => {
      this.host.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
    });
  }

  #listenForScroll() {
    if (this.#config.closeOnScroll) {
      document.addEventListener('scroll', () => this.host.hidePopover(), { once: true });
    }
  }

  #setupTrigger() {
    if (this.#trigger && this.#config.type === 'hint') {
      this.#trigger.addEventListener('focus', () => this.host.showPopover());
      this.#trigger.addEventListener('mousemove', () => this.host.showPopover());
      this.#trigger.addEventListener('focusout', () => this.host.hidePopover());
      this.#trigger.addEventListener('mouseleave', () => this.host.hidePopover());
    }
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
