import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';
import { querySelectorByIdRef } from '../utils/dom.js';
import { getFlattenedDOMTree } from '../utils/traversal.js';
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

  get #triggers(): HTMLElement[] {
    if (this.host.parentElement) {
      // if no explicit trigger was provided, find all triggers in the parent element
      return (getFlattenedDOMTree(this.host.parentElement) as HTMLButtonElement[])
        .filter(e => e.popoverTargetElement === this.host || e.getAttribute('popovertarget') === this.host.id)
        .sort(e => (e === this.#activeElement ? -1 : 1));
    } else {
      return [];
    }
  }

  #activeElement: any = document.body;

  get #anchor(): HTMLElement {
    if (typeof this.#config.anchor === 'string' && this.#config.anchor?.length) {
      return querySelectorByIdRef(this.host, this.#config.anchor);
    } else if (this.#config.anchor) {
      return this.#config.anchor as HTMLElement;
    } else if (this.#triggers[0]) {
      return this.#triggers[0];
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
    this.#setupTriggers();
    this.#setupScrollListener();
    this.#setupFocusTrap();
    this.#setupToggleEvents();

    if (this.#config.open) {
      this.host.showPopover();
    }

    await new Promise(r => requestAnimationFrame(() => r('')));
    this.host._internals.states.add('popover-ready');
  }

  hostDisconnected() {
    this.#removeTriggers();
    this.#removeScrollListener();
  }

  #setupPopoverType() {
    if (!this.#config.static) {
      this.host.popover = this.#config.type !== 'auto' ? 'manual' : 'auto';
    }
  }

  #setupCSSAnchorPosition() {
    if (!(this.#anchor.style as any).anchorName) {
      const id = createId();
      (this.#anchor.style as any).anchorName = `--${id}`;
      (this.host.style as any).positionAnchor = `--${id}`;
    }
  }

  #setupToggleEvents() {
    this.host.addEventListener('beforetoggle', (e: any) => {
      if (e.newState === 'open') {
        this.#activeElement = document.activeElement;
        this.#setupCSSAnchorPosition();
      }

      this.host.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
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
