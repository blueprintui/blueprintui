import { ReactiveController, ReactiveElement } from 'lit';
import { querySelectorByIdRef } from '../utils/dom.js';

// Re-export mixin for framework-agnostic usage
export { PopoverTriggerMixin } from '../mixins/popover-trigger.mixin.js';
export type { PopoverTriggerHost } from '../mixins/popover-trigger.mixin.js';

export interface PopoverTrigger extends ReactiveElement {
  popoverTargetAction: 'toggle' | 'show' | 'hide';
  popoverTargetElement: HTMLElement;
  popovertarget: string;
  disabled: boolean;
}

/**
 * Provides necessary API for popover trigger types via Lit decorator pattern.
 * For framework-agnostic usage, prefer using PopoverTriggerMixin directly.
 *
 * @see PopoverTriggerMixin
 * @see https://github.com/whatwg/html/issues/9110
 */
export function typePopoverTrigger<T extends PopoverTrigger>(): ClassDecorator {
  return (target: any, _context?: ClassDecoratorContext) => {
    return target.addInitializer((instance: T & { typePopoverTriggerController?: TypePopoverTriggerController<T> }) => {
      if (!instance.typePopoverTriggerController) {
        Object.defineProperty(instance, 'typePopoverTriggerController', {
          value: new TypePopoverTriggerController(instance),
          writable: false
        });
      }

      return instance.typePopoverTriggerController;
    });
  };
}

export class TypePopoverTriggerController<T extends PopoverTrigger> implements ReactiveController {
  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.host.addEventListener('click', () => {
      const id = this.host.popoverTargetElement?.id ? this.host.popoverTargetElement?.id : this.host.popovertarget;
      if (id && !this.host.disabled) {
        const popover = querySelectorByIdRef(this.host, id);
        if (this.host.popoverTargetAction === 'show') {
          popover?.showPopover();
        } else if (this.host.popoverTargetAction === 'hide') {
          popover?.hidePopover();
        } else {
          popover?.togglePopover();
        }
      }
    });
  }
}
