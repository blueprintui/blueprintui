import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedDOMTree } from '../utils/traversal.js';

export interface PopoverTrigger extends ReactiveElement {
  popoverTargetAction: 'toggle' | 'show' | 'hide';
  popoverTargetElement: HTMLElement;
  popovertarget: string;
  disabled: boolean;
}

/**
 * Provides nessesary API for popover trigger types
 * https://github.com/whatwg/html/issues/9110
 */
export function typePopoverTrigger<T extends PopoverTrigger>(): ClassDecorator {
  return (target: any) => {
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
        const popover = getFlattenedDOMTree(this.host.getRootNode()).find(e => e.id === id) as any;
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
