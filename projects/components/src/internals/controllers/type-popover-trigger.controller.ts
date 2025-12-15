import { ReactiveController, ReactiveElement } from 'lit';
import { querySelectorByIdRef } from '../utils/dom.js';

export interface PopoverTrigger extends ReactiveElement {
  popoverTargetAction: 'toggle' | 'show' | 'hide';
  popoverTargetElement: HTMLElement;
  disabled: boolean;
}

/**
 * Provides necessary API for popover trigger types https://github.com/whatwg/html/issues/9110
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
  #observer: MutationObserver;

  constructor(private host: T) {
    this.host.addController(this);

    this.#observer = new MutationObserver(mutations => {
      const element = mutations[0].target as HTMLElement;
      this.host.popoverTargetElement = querySelectorByIdRef(this.host, element.getAttribute('popovertarget'));
    });

    this.#observer.observe(this.host, { attributes: true, attributeFilter: ['popovertarget'] });
  }

  async hostConnected() {
    await this.host.updateComplete;

    const popovertarget = this.host.getAttribute('popovertarget');
    if (popovertarget) {
      this.host.popoverTargetElement = querySelectorByIdRef(this.host, popovertarget);
    }

    this.host.addEventListener('click', () => {
      const popover = this.host.popoverTargetElement;
      if (popover && !this.host.disabled) {
        if (this.host.popoverTargetAction === 'show') {
          popover.showPopover({ source: this.host });
        } else if (this.host.popoverTargetAction === 'hide') {
          popover.hidePopover();
        } else {
          popover.togglePopover({ source: this.host });
        }
      }
    });
  }
}
