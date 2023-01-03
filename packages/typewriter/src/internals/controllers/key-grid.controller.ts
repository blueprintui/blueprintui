import { ReactiveController, ReactiveElement } from 'lit';
import { getFlattenedFocusableItems } from '../utils/traversal.js';
import { validKeyNavigationCode, getNextKeyGridItem } from '../utils/keynav.js';
import { focusElement, getActiveElement, initializeKeyListItems, setActiveKeyListItem, simpleFocusable } from '../utils/focus.js';
import { contextMenuClick } from '../utils/dom.js';
import { onChildListMutation, onFirstInteraction } from '../utils/events.js';

export interface KeyGridConfig {
  host?: HTMLElement;
  grid: HTMLElement[][];
}

/**
 * https://w3c.github.io/aria-practices/#gridNav_focus
 */
export function keyGrid<T extends ReactiveElement>(fn?: (host: T) => KeyGridConfig): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T) => new KeyGridController(instance, fn));
  };
}

export class KeyGridController<T extends ReactiveElement> implements ReactiveController {
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
    return { ...this.fn(this.host) };
  }

  constructor(private host: T, private fn: (host: T) => KeyGridConfig) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    await onFirstInteraction(this.#host);
    initializeKeyListItems(this.#cells);
    this.#host.addEventListener('mouseup', (e: MouseEvent) => this.#clickCell(e));
    this.#host.addEventListener('keydown', (e: KeyboardEvent) => this.#keynavCell(e));
    this.#host.addEventListener('keyup', (e: KeyboardEvent) => this.#updateCellActivation(e));
    this.#observers.push(onChildListMutation(this.#host, () => initializeKeyListItems(this.#cells)));
  }

  hostDisconnected() {
    this.#observers.forEach(o => o.disconnect());
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
        ctrlKey: e.ctrlKey,
        dir: this.#host.dir
      });

      this.#setActiveCell(e, this.#grid[y][x]);
      e.preventDefault();
    }
  }

  #setActiveCell(e: any, activeCell: HTMLElement) {
    setActiveKeyListItem(this.#cells, activeCell);

    // https://w3c.github.io/aria-practices/#gridNav_focus
    const items = getFlattenedFocusableItems(activeCell).filter(i => !i.hidden && !i.ariaHidden);
    const simpleItems = items.filter(i => simpleFocusable(i));

    if (simpleItems.length === 1 && items.length === 1) {
      focusElement(simpleItems[0]);
    } else {
      focusElement(activeCell);
    }

    activeCell.dispatchEvent(
      new CustomEvent('bpKeyChange', {
        bubbles: true,
        detail: { code: e.code, shiftKey: e.shiftKey, activeItem: activeCell },
      })
    );
  }

  #updateCellActivation(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      this.#activeCell?.focus();
    }

    if (e.code === 'Enter' && this.#activeCell === e.composedPath()[0]) {
      getFlattenedFocusableItems(this.#activeCell as Node)[0]?.focus();
    }
  }
}
