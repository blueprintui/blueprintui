import { querySelectorByIdRef } from '../utils/dom.js';

export interface PopoverTriggerHost extends HTMLElement {
  popoverTargetAction?: 'toggle' | 'show' | 'hide';
  popoverTargetElement?: HTMLElement;
  popovertarget?: string;
  disabled?: boolean;
  connectedCallback?(): void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * A TypeScript mixin that provides popover trigger functionality for any HTMLElement.
 * This mixin is framework-agnostic and can be used with buttons, anchors, or custom elements.
 *
 * @example
 * ```typescript
 * class MyButton extends PopoverTriggerMixin(HTMLElement) {
 *   connectedCallback() {
 *     super.connectedCallback();
 *     // custom initialization
 *   }
 * }
 * ```
 *
 * @see https://github.com/whatwg/html/issues/9110
 */
export function PopoverTriggerMixin<TBase extends Constructor<PopoverTriggerHost>>(Base: TBase) {
  return class PopoverTriggerMixinClass extends Base {
    #popoverTriggerInitialized = false;

    connectedCallback() {
      // Call super if it exists (for subclasses that extend this mixin)
      if (typeof (Base.prototype as any).connectedCallback === 'function') {
        (Base.prototype as any).connectedCallback.call(this);
      }
      this.#initializePopoverTrigger();
    }

    async #initializePopoverTrigger() {
      if (this.#popoverTriggerInitialized) {
        return;
      }
      this.#popoverTriggerInitialized = true;

      await this.#waitForReady();

      this.addEventListener('click', () => {
        const id = this.popoverTargetElement?.id ? this.popoverTargetElement?.id : this.popovertarget;
        if (id && !this.disabled) {
          const popover = querySelectorByIdRef(this, id) as HTMLElement & {
            showPopover?: () => void;
            hidePopover?: () => void;
            togglePopover?: () => void;
          };
          if (this.popoverTargetAction === 'show') {
            popover?.showPopover?.();
          } else if (this.popoverTargetAction === 'hide') {
            popover?.hidePopover?.();
          } else {
            popover?.togglePopover?.();
          }
        }
      });
    }

    async #waitForReady() {
      // Support for LitElement updateComplete or similar async ready patterns
      if ((this as any).updateComplete) {
        await (this as any).updateComplete;
      }
    }
  };
}
