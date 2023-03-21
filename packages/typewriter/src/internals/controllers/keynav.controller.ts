import { ReactiveController, ReactiveElement } from 'lit';
import { getFlatFocusableItems } from '../utils/traversal.js';
import { validKeyNavigationCode, getNextKeyGridItem } from '../utils/keynav.js';
import {
  focusElement,
  getActiveElement,
  initializeKeyListItems,
  setActiveKeyListItem,
  simpleFocusable
} from '../utils/focus.js';
import { contextMenuClick } from '../utils/dom.js';
import { onChildListMutation, onFirstInteraction } from '../utils/events.js';

export interface KeyGridConfig {
  host?: HTMLElement;
  manageFocus?: boolean;
  manageTabindex?: boolean;
  loop?: boolean;
  lazy?: boolean;
  grid: HTMLElement[][];
}

/**
 * https://w3c.github.io/aria-practices/#gridNav_focus
 */
export function keynav<T extends ReactiveElement>(fn?: (host: T) => KeyGridConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T) => new KeynavController(instance, fn));
  };
}

export class KeynavController<T extends ReactiveElement> implements ReactiveController {
  #observers: MutationObserver[] = [];

  get #host() {
    return this.#config.host || this.host;
  }

  get #grid() {
    return this.#config.grid;
  }

  get #cells() {
    return Array.from(this.#grid.flat());
  }

  get #activeCell() {
    return Array.from(this.#cells).find(i => i.tabIndex === 0) as HTMLElement;
  }

  get #config() {
    return { manageFocus: true, manageTabindex: true, loop: false, lazy: false, ...this.fn(this.host) };
  }

  constructor(private host: T, private fn: (host: T) => KeyGridConfig) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    await (this.#config.lazy ? onFirstInteraction(this.#host) : new Promise(r => setTimeout(() => r(null), 0)));
    this.#initializeKeyListItems();
    this.#host.addEventListener('pointerup', (e: MouseEvent) => this.#clickCell(e));
    this.#host.addEventListener('keydown', (e: KeyboardEvent) => this.#keynavCell(e));
    this.#host.addEventListener('keyup', (e: KeyboardEvent) => this.#updateCellActivation(e));
    this.#observers.push(onChildListMutation(this.#host, () => this.#initializeKeyListItems()));
  }

  hostDisconnected() {
    this.#observers.forEach(o => o.disconnect());
  }

  #initializeKeyListItems() {
    if (this.#config.manageFocus && this.#config.manageTabindex) {
      initializeKeyListItems(this.#cells);
    }
  }

  #clickCell(e: MouseEvent) {
    if (!contextMenuClick(e)) {
      const activeCell = e.composedPath().find(i => this.#cells.find(c => c === i));
      if (activeCell) {
        this.#setActiveCell(e, activeCell as HTMLElement);
      }
    }
  }

  #keynavCell(e: KeyboardEvent) {
    if (validKeyNavigationCode(e) && simpleFocusable(getActiveElement() as Element)) {
      const { x, y } = getNextKeyGridItem(this.#grid, {
        code: e.code,
        loop: this.#config.loop,
        ctrlKey: e.ctrlKey,
        dir: this.#host.dir
      });

      this.#setActiveCell(e, this.#grid[y][x]);
      e.preventDefault();
    }
  }

  #setActiveCell(e: any, activeCell: HTMLElement) {
    if (this.#config.manageFocus) {
      if (this.#config.manageTabindex) {
        setActiveKeyListItem(this.#cells, activeCell);
      }

      // https://w3c.github.io/aria-practices/#gridNav_focus
      const items = getFlatFocusableItems(activeCell).filter(i => !i.hidden && !i.ariaHidden);
      const simpleItems = items.filter(i => simpleFocusable(i));

      if (simpleItems.length === 1 && items.length === 1) {
        focusElement(simpleItems[0]);
      } else {
        focusElement(activeCell);
      }

      if (e.type !== 'pointerup') {
        e.preventDefault();
      }
    }

    activeCell.dispatchEvent(
      new CustomEvent('bp-keychange', {
        bubbles: true,
        detail: {
          code: e.code,
          shiftKey: e.shiftKey,
          metaKey: e.ctrlKey || e.metaKey,
          activeItem: activeCell
          // previousItem (keylist)
        }
      })
    );
  }

  #updateCellActivation(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.#activeCell?.focus();
    }

    if (e.code === 'Enter' && this.#activeCell === e.composedPath()[0]) {
      getFlatFocusableItems(this.#activeCell as Node)[0]?.focus();
    }
  }
}
