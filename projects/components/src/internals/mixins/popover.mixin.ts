import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';
import { querySelectorByIdRef } from '../utils/dom.js';
import { getFlattenedDOMTree } from '../utils/traversal.js';
import { createId } from '../utils/string.js';

export interface PopoverConfig {
  focusTrap?: boolean;
  closeOnScroll?: boolean;
  open?: boolean;
  static?: boolean;
  type?: 'auto' | 'manual' | 'hint';
  anchor?: HTMLElement | string;
}

export interface PopoverHost extends HTMLElement {
  _internals?: ElementInternals;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * A TypeScript mixin that provides popover functionality for HTMLElement-based classes.
 * This mixin is framework-agnostic and can be used with vanilla custom elements
 * or any Web Component implementation.
 *
 * For LitElement components, use the `@typePopover` decorator instead which
 * provides better TypeScript support.
 *
 * @example
 * ```typescript
 * // Usage with vanilla custom elements
 * class MyPopover extends PopoverMixin(HTMLElement, () => ({ type: 'auto' })) {
 *   connectedCallback() {
 *     super.connectedCallback();
 *     // custom initialization
 *   }
 * }
 * customElements.define('my-popover', MyPopover);
 * ```
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
 */
export function PopoverMixin<TBase extends Constructor<HTMLElement>>(
  Base: TBase,
  configFn: (host: InstanceType<TBase>) => PopoverConfig
) {
  return class PopoverMixinClass extends Base {
    #popoverInitialized = false;
    #activeElement: Element | null = document.body;
    #scrollFn = () => {
      if (this.matches(':popover-open')) {
        this.hidePopover();
      }
    };
    #showPopoverFn = () => this.showPopover();
    #hidePopoverFn = () => this.hidePopover();
    #cachedTriggers: HTMLElement[] = [];

    declare _internals: ElementInternals;

    get #popoverConfig(): PopoverConfig {
      return configFn(this as InstanceType<TBase>);
    }

    get #triggers(): HTMLElement[] {
      if (this.getRootNode()) {
        const elements = getFlattenedDOMTree(this.getRootNode()) as (HTMLButtonElement & {
          commandForElement?: HTMLElement;
        })[];
        const popoverForTriggers = elements.filter(
          e => e.popoverTargetElement === this || e.getAttribute('popovertarget') === this.id
        );
        const commandForTriggers = elements.filter(
          e => e.commandForElement === this || e.getAttribute('commandfor') === this.id
        );
        return [...popoverForTriggers, ...commandForTriggers].sort(e => (e === this.#activeElement ? -1 : 1));
      } else {
        return [];
      }
    }

    get #anchor(): HTMLElement {
      const anchor = this.#popoverConfig.anchor;
      if (typeof anchor === 'string' && anchor?.length) {
        return querySelectorByIdRef(this, anchor);
      } else if (anchor) {
        return anchor as HTMLElement;
      } else if (this.#triggers[0]) {
        return this.#triggers[0];
      } else {
        return document.body;
      }
    }

    connectedCallback() {
      // Call super if it exists (for subclasses that extend this mixin)
      if (typeof (Base.prototype as any).connectedCallback === 'function') {
        (Base.prototype as any).connectedCallback.call(this);
      }
      this.#initializePopover();
    }

    disconnectedCallback() {
      // Call super if it exists (for subclasses that extend this mixin)
      if (typeof (Base.prototype as any).disconnectedCallback === 'function') {
        (Base.prototype as any).disconnectedCallback.call(this);
      }
      this.#cleanupPopover();
    }

    async #initializePopover() {
      if (this.#popoverInitialized) {
        return;
      }
      this.#popoverInitialized = true;

      attachInternals(this);
      await this.#waitForReady();

      this.#setupPopoverType();
      this.#setupTriggers();
      this.#setupScrollListener();
      this.#setupFocusTrap();
      this.#setupToggleEvents();
      this.#setupCommandEvents();

      if (this.#popoverConfig.open) {
        this.showPopover();
      }

      await new Promise(r => requestAnimationFrame(() => r('')));
      this._internals?.states.add('popover-ready');
    }

    #cleanupPopover() {
      this.#removeTriggers();
      this.#removeScrollListener();
    }

    async #waitForReady() {
      // Support for LitElement updateComplete or similar async ready patterns
      if ((this as any).updateComplete) {
        await (this as any).updateComplete;
      }
    }

    #setupPopoverType() {
      if (!this.#popoverConfig.static) {
        this.popover = this.#popoverConfig.type ?? 'auto';
      }
    }

    #setupCSSAnchorPosition() {
      if (!(this.#anchor.style as any).anchorName) {
        const id = createId();
        (this.#anchor.style as any).anchorName = `--${id}`;
        (this.style as any).positionAnchor = `--${id}`;
      }
    }

    #setupToggleEvents() {
      this.addEventListener('beforetoggle', (e: ToggleEvent) => {
        if (e.newState === 'open') {
          this.#activeElement = document.activeElement;
          this.#setupCSSAnchorPosition();
        }

        this.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
      });
    }

    #setupCommandEvents() {
      this.addEventListener('command', (e: any) => {
        if (e.command === 'toggle-popover') {
          this.togglePopover();
        } else if (e.command === 'show-popover') {
          this.showPopover();
        } else if (e.command === 'hide-popover') {
          this.hidePopover();
        }
      });
    }

    #setupScrollListener() {
      if (this.#popoverConfig.closeOnScroll) {
        document.addEventListener('scroll', this.#scrollFn);
      }
    }

    #removeScrollListener() {
      document.removeEventListener('scroll', this.#scrollFn);
    }

    #setupTriggers() {
      if (this.#popoverConfig.type === 'hint') {
        this.#cachedTriggers = this.#triggers;
        this.#cachedTriggers.forEach(trigger => {
          trigger.addEventListener('focus', this.#showPopoverFn);
          trigger.addEventListener('mousemove', this.#showPopoverFn);
          trigger.addEventListener('focusout', this.#hidePopoverFn);
          trigger.addEventListener('mouseleave', this.#hidePopoverFn);
        });
      }
    }

    #removeTriggers() {
      if (this.#popoverConfig.type === 'hint') {
        this.#cachedTriggers.forEach(trigger => {
          trigger.removeEventListener('focus', this.#showPopoverFn);
          trigger.removeEventListener('mousemove', this.#showPopoverFn);
          trigger.removeEventListener('focusout', this.#hidePopoverFn);
          trigger.removeEventListener('mouseleave', this.#hidePopoverFn);
        });
      }
    }

    #setupFocusTrap() {
      if (this.#popoverConfig.focusTrap) {
        createFocusTrap(this);
        this.#setupFocusFirst();
      }
    }

    #setupFocusFirst() {
      this.addEventListener('toggle', (e: any) => {
        if (e.newState === 'open') {
          getFlattenedFocusableItems(this)[0]?.focus();
        }
      });
    }
  };
}
