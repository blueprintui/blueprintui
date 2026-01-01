import { getFlattenedFocusableItems, createFocusTrap } from '../utils/focus.js';
import { attachInternals } from '../utils/a11y.js';
import { createCustomEvent } from '../utils/events.js';
import { querySelectorByIdRef } from '../utils/dom.js';
import { createId } from '../utils/string.js';

function enableScrollLock() {
  document.documentElement.style.scrollbarGutter = 'stable';
  document.body.style.overflow = 'hidden';
}

function disableScrollLock() {
  document.body.style.overflow = '';
}

export interface PopoverConfig {
  type: 'auto' | 'manual' | 'hint';
  modal: boolean;
  focusTrap: boolean;
  scrollLock: boolean;
}

type Constructor<T = object> = new (...args: any[]) => T;

// Internal interface extending HTMLElement with optional lifecycle methods from LitElement
interface BaseElementInternal extends HTMLElement {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  requestUpdate?(name?: string): void;
}

/**
 * Mixin that provides popover functionality for web components.
 * Uses the native Popover API with CSS anchor positioning.
 */
export function PopoverMixin<T extends Constructor<HTMLElement>>(Base: T) {
  class PopoverMixinClass extends (Base as Constructor<BaseElementInternal>) {
    #open = false;
    #anchor: HTMLElement | string;

    /** Controls whether the popover is visible on initialization */
    get open(): boolean {
      return this.#open;
    }

    set open(value: boolean) {
      this.#open = value;
      if (value) {
        this.setAttribute('open', '');
      } else {
        this.removeAttribute('open');
      }
      this.requestUpdate?.('open');
    }

    /** Defines the anchor element or selector that the popover will position relative to */
    get anchor(): HTMLElement | string {
      return this.#anchor;
    }

    set anchor(value: HTMLElement | string) {
      this.#anchor = value;
      this.requestUpdate?.('anchor');
    }

    /** Configuration options for popover behavior - override this getter in subclasses */
    get popoverConfig(): PopoverConfig {
      return {
        type: 'auto',
        modal: false,
        focusTrap: false,
        scrollLock: false
      };
    }

    declare _internals: ElementInternals;

    #source: HTMLElement | null = null;

    get #anchorElement(): HTMLElement {
      if (typeof this.anchor === 'string' && this.anchor?.length) {
        return querySelectorByIdRef(this, this.anchor);
      } else if (this.anchor instanceof HTMLElement) {
        return this.anchor;
      } else if (this.#source) {
        return this.#source;
      } else {
        return document.body;
      }
    }

    async connectedCallback() {
      super.connectedCallback?.();
      attachInternals(this);

      if (this.hasAttribute('open')) {
        this.#open = true;
      }

      if (this.hasAttribute('anchor')) {
        this.#anchor = this.getAttribute('anchor') ?? '';
      }

      this.#setupPopoverType();
      this.#setupFocusTrap();
      this.#updateModalState();
      this.addEventListener('beforetoggle', this.#onBeforeToggle);
      this.addEventListener('toggle', this.#onToggle);
      this.addEventListener('command', this.#onCommand);
      this.addEventListener('interest', this.#onInterest);
      this.addEventListener('loseinterest', this.#onLoseInterest);

      if (this.open) {
        this.showPopover();
      } else {
        this.inert = true;
      }

      await new Promise(r => requestAnimationFrame(() => r('')));
      this._internals.states.add('popover-ready');
    }

    #onBeforeToggle(e: ToggleEvent) {
      this.#updateModalState();
      this.#source = e.source as HTMLElement;
      if (e.newState === 'open') {
        this.#updateCSSAnchorPosition();
      }

      this.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
    }

    #onToggle(e: ToggleEvent) {
      this.inert = e.newState !== 'open';

      if (e.newState === 'open' && this.popoverConfig.focusTrap) {
        getFlattenedFocusableItems(this)[0]?.focus();
      }

      if (e.newState === 'open' && this.popoverConfig.scrollLock) {
        enableScrollLock();
      }

      if (e.newState === 'closed' && this.popoverConfig.scrollLock) {
        disableScrollLock();
      }
    }

    #onCommand(e: CommandEvent) {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source.localName.includes('-');
      if (isCustomElement) {
        if (e.command === 'toggle-popover') {
          this.togglePopover({ source: this.#source as HTMLElement });
        } else if (e.command === 'show-popover') {
          this.showPopover({ source: this.#source as HTMLElement });
        } else if (e.command === 'hide-popover') {
          this.hidePopover();
        }
      }
    }

    #onInterest(e: any) {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');
      if (isCustomElement) {
        this.showPopover({ source: this.#source as HTMLElement });
      }
    }

    #onLoseInterest(e: any) {
      this.#source = e.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');
      if (isCustomElement) {
        this.hidePopover();
      }
    }

    #setupPopoverType() {
      this.popover = this.popoverConfig?.type ?? 'auto';
    }

    #setupFocusTrap() {
      if (this.popoverConfig.focusTrap) {
        createFocusTrap(this);
      }
    }

    #updateModalState() {
      if (this.popoverConfig.modal) {
        this._internals.ariaModal = 'true';
        this._internals.states.add('modal');
      } else {
        this._internals.ariaModal = 'false';
        this._internals.states.delete('modal');
      }
    }

    #updateCSSAnchorPosition() {
      const anchor = this.#anchorElement;
      if (anchor && !anchor.style.anchorName) {
        anchor.style.anchorName = `--${createId()}`;
      }
      if (anchor) {
        this.style.positionAnchor = anchor.style.anchorName;
      }
    }
  }

  return PopoverMixinClass as unknown as Constructor<PopoverMixinInterface> & T;
}

export interface PopoverMixinInterface {
  open: boolean;
  anchor: HTMLElement | string;
  popoverConfig: PopoverConfig;
  _internals: ElementInternals;
}
