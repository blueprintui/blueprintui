import { ReactiveController, ReactiveElement } from 'lit';
import { onChildListMutation, onFirstInteraction } from '../utils/events.js';
import { getFlattenedDOMTree, getFlattenedFocusableItems } from '../utils/traversal.js';
import { contextMenuClick } from '../utils/dom.js';
import { validKeyNavigationCode } from '../utils/keynav.js';
import { focusElement, getActiveElement, initializeKeyListItems, setActiveKeyListItem, simpleFocusable } from '../utils/focus.js';
import { getNextKeyGridItem } from './key.utils.js';

export interface KeyGridConfig {
  keyGridControllerConfig: {
    grid?: HTMLElement;
    rows: NodeListOf<HTMLElement> | HTMLElement[];
    cells: NodeListOf<HTMLElement> | HTMLElement[];
  }
}

/**
 * https://w3c.github.io/aria-practices/#gridNav_focus
 */
export function keyGrid<T extends ReactiveElement & KeyGridConfig>(): ClassDecorator {
  return (target: any) => target.addInitializer((instance: T) => new KeyGridController(instance));
}

export class KeyGridController<T extends ReactiveElement & KeyGridConfig> implements ReactiveController {
  #observers: MutationObserver[] = [];

  get #grid() {
    return this.host.keyGridControllerConfig.grid;
  }

  get #rows() {
    return Array.from(this.host.keyGridControllerConfig.rows);
  }

  get #cells() {
    return Array.from(this.host.keyGridControllerConfig.cells);
  }

  get #activeCell() {
    return Array.from(this.#cells).find(i => i.tabIndex === 0) as HTMLElement;
  }

  constructor(private host: T) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    await onFirstInteraction(this.host);
    initializeKeyListItems(this.#cells);
    this.#grid.addEventListener('mouseup', (e: MouseEvent) => this.#clickCell(e));
    this.#grid.addEventListener('keydown', (e: KeyboardEvent) => this.#keynavCell(e));
    this.#grid.addEventListener('keyup', (e: KeyboardEvent) => this.#updateCellActivation(e));
    this.#observers.push(onChildListMutation(this.#grid, () => initializeKeyListItems(this.#cells)));
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
      const { x, y } = getNextKeyGridItem(this.#cells, this.#rows, {
        code: e.code,
        ctrlKey: e.ctrlKey,
        dir: this.host.dir,
      });

      const nextCell = Array.from(getFlattenedDOMTree(this.#rows[y])).filter(
        c => !!this.#cells.find(i => i === c)
      )[x];
      this.#setActiveCell(e, nextCell);
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
