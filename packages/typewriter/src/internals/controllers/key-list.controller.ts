import { ReactiveController, ReactiveElement } from 'lit';
import { focusElement, initializeKeyListItems, setActiveKeyListItem } from '../utils/focus.js';
import { validKeyNavigationCode, getNextKeyListItem, KeyCode } from '../utils/keynav.js';
import { getFlattenedFocusableItems } from '../utils/traversal.js';

export interface KeyListConfig {
  direction?: 'all' | 'inline' | 'block';
  manageFocus?: boolean;
  manageTabindex?: boolean;
  loop?: boolean;
  dir?: string | null;
  items?: HTMLElement[] | NodeListOf<HTMLElement>;
}

/** https://webaim.org/techniques/keyboard/ */
export function keyList<T extends ReactiveElement>(fn?: (host: T) => KeyListConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T) => new KeyListController(instance, fn));
  };
}

export class KeyListController<T extends ReactiveElement> implements ReactiveController {
  get #listItems() {
    return Array.from(this.#config.items).filter((i: any) => i.disabled !== true);
  }

  get #config(): KeyListConfig {
    return {
      direction: 'inline',
      manageFocus: true,
      manageTabindex: true,
      loop: false,
      dir: this.host.getAttribute('rtl'),
      ...this.fn(this.host),
    };
  }

  constructor(private host: T, private fn: (host: T) => KeyListConfig) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#initializeTabIndex();
    this.host.addEventListener('click', (e: any) => this.#clickItem(e));
    this.host.addEventListener('keydown', (e: any) => this.#focusItem(e));
    this.host.shadowRoot?.addEventListener('click', (e: any) => this.#clickItem(e));
    this.host.shadowRoot?.addEventListener('keydown', (e: any) => this.#focusItem(e));
  }

  #initializeTabIndex() {
    if (this.#config.manageFocus && this.#config.manageTabindex) {
      initializeKeyListItems(this.#listItems);
    }
  }

  #clickItem(e: Event) {
    const activeItem = this.#getActiveItem(e);
    if (activeItem) {
      this.#setActiveItem(e, activeItem);
    }
  }

  #focusItem(e: KeyboardEvent) {
    if (validKeyNavigationCode(e)) {
      const activeItem = this.#getActiveItem(e);
      if (activeItem) {
        const { next, previous } = getNextKeyListItem(activeItem, this.#listItems, {
          ...this.#config,
          code: e.code as KeyCode,
        });

        if (next !== previous) {
          this.#setActiveItem(e, this.#listItems[next], this.#listItems[previous]);
        }
      }
    }
  }

  #getActiveItem(e: Event) {
    return Array.from(this.#listItems).find(
      c => c === (e.target as HTMLElement).closest(this.#listItems[0].tagName.toLocaleLowerCase()) ?? c === e.target
    );
  }

  #setActiveItem(e: any, activeItem: HTMLElement, previousItem?: HTMLElement) {
    if (this.#config.manageFocus) {
      if (this.#config.manageTabindex) {
        setActiveKeyListItem(this.#listItems, activeItem);
      }

      const items = getFlattenedFocusableItems(activeItem);
      const item = items[0] ?? activeItem;
      focusElement(item);
      
      if (e.type !== 'click') {
        e.preventDefault();
      }
    }

    activeItem.dispatchEvent(
      new CustomEvent('bpKeyChange', {
        bubbles: true,
        detail: {
          activeItem,
          previousItem,
          code: e.code,
          metaKey: e.ctrlKey || e.metaKey,
          items: this.#config.items
        },
      })
    );
  }
}
