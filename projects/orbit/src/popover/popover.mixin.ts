import { getFlattenedFocusableItems, createFocusTrap } from '../internals/focus.js';
import { attachInternals } from '../internals/a11y.js';
import { createCustomEvent } from '../internals/events.js';
import { enableScrollLock, disableScrollLock } from '../internals/scroll-lock.js';

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

const sharedStylesheet = new CSSStyleSheet();

sharedStylesheet.replaceSync(`
  :host {
    position-anchor: auto !important; /* https://web.dev/learn/css/anchor-positioning#implicit_tethers */
  }
`);

/**
 * Mixin that provides popover functionality for web components.
 * Uses the native Popover API with CSS anchor positioning.
 */
export function PopoverMixin<T extends Constructor<HTMLElement>>(Base: T) {
  class PopoverMixinClass extends (Base as Constructor<BaseElementInternal>) {
    #open = false;

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

    constructor() {
      super();

      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      this.shadowRoot.adoptedStyleSheets = [sharedStylesheet, ...this.shadowRoot.adoptedStyleSheets];
    }

    async connectedCallback() {
      super.connectedCallback?.();
      attachInternals(this);

      if (this.hasAttribute('open')) {
        this.#open = true;
      }

      this.#setupPopoverType();
      this.#setupFocusTrap();
      this.#updateModalState();
      this.addEventListener('beforetoggle', this.#onBeforeToggle);
      this.addEventListener('toggle', this.#onToggle);
      this.addEventListener('command', this.#onCommand as EventListener);
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

    #onBeforeToggle = (e: ToggleEvent) => {
      this.#updateModalState();
      this.#source = e.source as HTMLElement;
      this.dispatchEvent(createCustomEvent(e.newState === 'open' ? 'open' : 'close'));
    };

    #onToggle = (e: ToggleEvent) => {
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
    };

    #onCommand = (e: CommandEvent) => {
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
    };

    #timeoutId: number | null = null;
    #onInterest = (e: Event) => {
      const interestEvent = e as any;
      this.#source = interestEvent.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');
      if (isCustomElement) {
        const interestDelayStart = (getComputedStyle(this) as any).interestDelayStart;
        if (interestDelayStart) {
          this.#timeoutId = setTimeout(
            () => {
              this.showPopover({ source: this.#source as HTMLElement });
            },
            parseInt(interestDelayStart.replace('ms', '').replace('s', '000'))
          );
        } else {
          this.showPopover({ source: this.#source as HTMLElement });
        }
      }
    };

    #onLoseInterest = (e: Event) => {
      const loseInterestEvent = e as any;
      this.#source = loseInterestEvent.source as HTMLElement;
      const isCustomElement = this.#source?.localName.includes('-');

      if (isCustomElement) {
        this.hidePopover();
      }

      if (this.#timeoutId) {
        clearTimeout(this.#timeoutId);
        this.#timeoutId = null;
      }
    };

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
  }

  return PopoverMixinClass as unknown as Constructor<PopoverMixinInterface> & T;
}

export interface PopoverMixinInterface {
  open: boolean;
  anchor: HTMLElement | string;
  popoverConfig: PopoverConfig;
  _internals: ElementInternals;
}
