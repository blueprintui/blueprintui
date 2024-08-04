import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';
import { getRenderRoot, querySelectorByIdRef } from '../utils/dom.js';

export interface PopoverControllerConfig {
  focusTrap?: boolean;
  closeOnScroll?: boolean;
  trigger?: HTMLElement | string;
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

  #_triggers: HTMLElement[] = [];

  get #triggers(): HTMLElement[] {
    // if single explicit trigger was provided
    if (this.#config.trigger) {
      if (typeof this.#config.trigger === 'string') {
        this.#_triggers = [getRenderRoot(this.host).querySelector(`[popovertarget="${this.host.id}"]`)];
      } else {
        this.#_triggers = [this.#config.trigger];
      }
    } else if (this.host.parentElement) {
      // if no explicit trigger was provided, find all triggers in the parent element
      this.#_triggers = Array.from(getRenderRoot(this.host).querySelectorAll(`[popovertarget="${this.host.id}"]`));
    }

    return this.#_triggers;
  }

  #activeElement: any = document.body;

  get #anchor(): HTMLElement {
    if (typeof this.#config.anchor === 'string' && this.#config.anchor?.length) {
      return querySelectorByIdRef(this.host, this.#config.anchor);
    } else if (this.#config.anchor) {
      return this.#config.anchor as HTMLElement;
    } else {
      if (
        this.#activeElement.popoverTargetElement === this.host ||
        this.#activeElement.popovertarget === this.host.id
      ) {
        return this.#activeElement;
      } else {
        return document.body;
      }
    }
  }

  constructor(private host: T) {
    this.host.addController(this);
    attachInternals(this.host);
  }

  async hostConnected() {
    await this.host.updateComplete;

    this.#setupPopoverType();
    this.#setupCSSAnchorPosition();
    this.#listenForScroll();
    this.#setupTriggers();
    this.#setupFocusTrap();
    this.#setupToggleEvents();

    if (this.#config.open) {
      await new Promise(r => requestAnimationFrame(() => r('')));
      this.host.showPopover();
    }

    await new Promise(r => requestAnimationFrame(() => r('')));
    this.host._internals.states.add('popover-ready');
  }

  hostDisconnected() {
    this.#removeTriggers();
  }

  #setupPopoverType() {
    if (!this.#config.static) {
      this.host.popover = this.#config.type !== 'auto' ? 'manual' : 'auto';
    }
  }

  #setupCSSAnchorPosition() {
    if (this.#anchor?.id) {
      (this.#anchor.style as any).anchorName = `--${this.#anchor.id}`;
      (this.host.style as any).positionAnchor = `--${this.#anchor.id}`;
    }
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

  #showPopoverFn = () => this.host.showPopover();
  #hidePopoverFn = () => this.host.hidePopover();

  #setupTriggers() {
    if (this.#config.type === 'hint') {
      this.#triggers.forEach(trigger => {
        trigger.addEventListener('focus', this.#showPopoverFn);
        trigger.addEventListener('mousemove', this.#showPopoverFn);
        trigger.addEventListener('focusout', this.#hidePopoverFn);
        trigger.addEventListener('mouseleave', this.#hidePopoverFn);
      });
    }
  }

  #removeTriggers() {
    if (this.#config.type === 'hint') {
      this.#triggers.forEach(trigger => {
        trigger.removeEventListener('focus', this.#showPopoverFn);
        trigger.removeEventListener('mousemove', this.#showPopoverFn);
        trigger.removeEventListener('focusout', this.#hidePopoverFn);
        trigger.removeEventListener('mouseleave', this.#hidePopoverFn);
      });
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
