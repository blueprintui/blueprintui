import { ReactiveController, ReactiveElement } from 'lit';
import { listenForAttributeChange } from '../utils/events.js';
import { getFlattenedDOMTree } from '../utils/traversal.js';

export interface PopoverControllerConfig {
  modal?: boolean;
  focusTrap?: boolean;
  closeOnScroll?: boolean;
  lightDismiss?: boolean;
  trigger?: HTMLElement | string;
  triggerType?: 'default' | 'hint';
}

export interface Popover extends ReactiveElement {
  typePopoverControllerConfig?: PopoverControllerConfig;
}

export function typePopover<T extends Popover>(fn?: (host: T) => PopoverControllerConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T & { typePopoverController?: TypePopoverController<T> }) => {
      if (!instance.typePopoverController) {
        Object.defineProperty(instance, 'typePopoverController', {
          value: new TypePopoverController(instance),
          writable: false
        });
      }

      if (!instance.typePopoverControllerConfig) {
        Object.defineProperty(instance, 'typePopoverControllerConfig', {
          get() {
            return fn(instance);
          }
        });
      }

      return instance.typePopoverController;
    });
  };
}

/**
 * Provides nessesary API for popover types
 * https://open-ui.org/components/popover.research.explainer#behaviors
 */
export class TypePopoverController<T extends Popover> implements ReactiveController {
  #observers: MutationObserver[] = [];

  get #config(): PopoverControllerConfig {
    return this.host.typePopoverControllerConfig;
  }

  get #dialog() {
    return this.host.shadowRoot.querySelector<HTMLDialog>('dialog');
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
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#dialog?.addEventListener('cancel', () => this.close());
    this.#dialog?.addEventListener('close', () => this.close());
    this.#toggleDialog();
    this.#listenForHiddenChange();
    this.#listenForScroll();
    this.#setupTrigger();
  }

  async hostUpdated() {
    await this.host.updateComplete;
    this.#toggleLightDismiss();
    this.#toggleDialog();
  }

  hostDisconnected() {
    this.#observers.forEach(observer => observer.disconnect());
  }

  async #toggleLightDismiss() {
    if (this.host.hasAttribute('hidden')) {
      document.removeEventListener('pointerup', this.#lightDismiss);
    } else {
      await new Promise(r => requestAnimationFrame(r));
      if (this.#config.lightDismiss) {
        document.addEventListener('pointerup', this.#lightDismiss);
      }
    }
  }

  #lightDismiss = ((e: any) => {
    const rect = this.#dialog.getBoundingClientRect();
    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;
    if (!clickedInDialog) {
      this.#dialog.close();
    }
  }).bind(this);

  #listenForHiddenChange() {
    this.#observers.push(
      listenForAttributeChange(this.host, 'hidden', () => {
        this.#toggleLightDismiss();
        this.#toggleDialog();
      })
    );
  }

  #listenForScroll() {
    if (this.#config.closeOnScroll) {
      setTimeout(() => document.addEventListener('scroll', () => this.close(), { once: true }));
    }
  }

  #toggleDialog() {
    this.#dialog.hidden = this.host.hidden;
    if (!this.host.hidden) {
      this.#dialog.removeAttribute('open');
      this.#listenForScroll();
      if (this.#config.modal) {
        this.#dialog?.showModal();
      } else if (this.#config.focusTrap) {
        this.#dialog.show();
      }
    } else {
      this.#dialog.close();
    }
  }

  #setupTrigger() {
    if (this.#trigger) {
      this.#trigger.addEventListener('click', () => this.#open());

      if (this.#config.triggerType === 'hint') {
        this.#trigger.addEventListener('focus', () => this.#open());
        this.#trigger.addEventListener('mousemove', () => this.#open());
        this.#trigger.addEventListener('focusout', () => this.close());
        this.#trigger.addEventListener('mouseleave', () => this.close());
      }
    }
  }

  close() {
    this.host.dispatchEvent(new CustomEvent('close'));
  }

  #open() {
    this.host.dispatchEvent(new CustomEvent('open'));
  }
}
