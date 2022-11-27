import { ReactiveController, ReactiveElement } from 'lit';
import { listenForAttributeChange } from '../utils/events.js';

/**
 * modal: true
 * lightDismiss: true
 * modal dialogs, drawers/panels
 */
type Auto = 'auto';

/**
 * modal: false
 * lightDismiss: true
 * tooltips, dropdowns
 */
type Hint = 'hint';

/**
 * modal: false
 * lightDismiss: false
 * toasts, snackbars, non-modal dialogs
 */
type Manual = 'manual';

export type PopoverType = Auto | Hint | Manual;

export interface PopoverControllerConfig {
  type: PopoverType;
  closeOnScroll: boolean;
}

export interface Popover extends ReactiveElement {
  typePopoverControllerConfig?: PopoverControllerConfig;
}

/**
 * Provides nessesary API for popover types
 * https://open-ui.org/components/popover.research.explainer#behaviors
 */
export function typePopover<T extends Popover>(fn?: (host: T) => { type: string }): ClassDecorator {
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
          get() { return fn(instance); }
        });
      }

      return instance.typePopoverController;
    });
  };
}

export class TypePopoverController<T extends Popover> implements ReactiveController {
  #observers: MutationObserver[] = [];

  get #config() {
    return this.host.typePopoverControllerConfig ? this.host.typePopoverControllerConfig : (this.host as any).typePopoverControllerConfig;
  }

  get #dialog() {
    return this.host.shadowRoot.querySelector<HTMLDialog>('dialog');
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
      document.removeEventListener('click', this.#lightDismiss);
    } else {
      await new Promise(r => requestAnimationFrame(r));
      document.addEventListener('click', this.#lightDismiss)
    }
  }

  #lightDismiss = ((e: any) => {
    const rect = this.#dialog.getBoundingClientRect();
    const clickedInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!clickedInDialog) {
      this.#dialog.close();
    }
  }).bind(this);

  #listenForHiddenChange() {
    this.#observers.push(listenForAttributeChange(this.host, 'hidden', () => {
      this.#toggleLightDismiss();
      this.#toggleDialog();
    }));
  }

  #listenForScroll() {
    if (this.#config.closeOnScroll) {
      document.body.onscroll = () => {
        if (!this.host.hidden) {
          this.close();
        }
      };
    }
  }

  #toggleDialog() {
    this.#dialog.hidden = this.host.hidden;
    if (this.#config.type === 'auto' && !this.host.hidden) {
      this.#dialog.removeAttribute('open');
      this.#dialog?.showModal();
    } else {
      this.#dialog.close();
    }
  }

  close() {
    this.host.dispatchEvent(new CustomEvent('close'));
  }
}
