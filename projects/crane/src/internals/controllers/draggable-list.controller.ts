import { ReactiveController, ReactiveElement } from 'lit';
import { addAttributeValue, removeAttributeValue } from '../utils/dom.js';
import { onChildListMutation } from '../utils/events.js';

export type DraggableItem = HTMLElement & { bpDraggableItem?: 'item' | 'dropzone' };

export function draggableList<T extends ReactiveElement>(fn?: (host: T) => DraggableListControllerConfig) {
  return (target: typeof ReactiveElement, _context?: ClassDecoratorContext) => {
    target.addInitializer((instance: ReactiveElement) => new DraggableListController(instance as T, fn!));
  };
}

export interface DraggableListControllerConfig {
  layout?: 'both' | 'horizontal' | 'vertical';
  items?: NodeListOf<DraggableItem> | DraggableItem[];
  dropZones?: NodeListOf<DraggableItem> | DraggableItem[];
  manageFocus?: boolean;
  manageTabindex?: boolean;
}

export interface BpDraggableChangeEvent {
  source?: HTMLElement | null | undefined;
  target?: HTMLElement | null | undefined;
  type: BpDraggableChangeType;
  interaction?: BpDraggableInteractionType;
}

export type BpDraggableChangeType = 'start' | 'drag' | 'over' | 'drop' | 'enter' | 'leave' | 'end';

export type BpDraggableInteractionType = 'pointer' | 'key';

export class DraggableListController<T extends ReactiveElement> implements ReactiveController {
  static #dragSrcEl: HTMLElement | null = null;

  #abortController: AbortController | null = null;
  #observer: MutationObserver | null = null;

  get #items() {
    return Array.from(this.#config.items ?? []);
  }

  get #dropZones() {
    return Array.from(this.#config.dropZones ?? []);
  }

  get #config(): DraggableListControllerConfig {
    return {
      layout: 'both',
      manageFocus: true,
      manageTabindex: false,
      ...this.fn(this.host)
    };
  }

  constructor(
    private host: T,
    private fn: (host: T) => DraggableListControllerConfig
  ) {
    this.host.addController(this);
  }

  async hostConnected() {
    this.#abortController = new AbortController();
    const signal = this.#abortController.signal;

    await this.host.updateComplete;
    this.#addDragEventListeners(signal);
    this.host.addEventListener('pointerdown', (e: PointerEvent) => this.#checkDragHandle(e), { signal });
    this.#observer = onChildListMutation(this.host, mutation => {
      if (mutation && signal.aborted === false) {
        const items = (Array.from(mutation.addedNodes) as HTMLElement[]).filter(i => i.draggable) as DraggableItem[];
        if (items.length) {
          this.#addDragEventListeners(signal);
        }
      }
    });
  }

  hostDisconnected() {
    this.#abortController?.abort();
    this.#abortController = null;
    this.#observer?.disconnect();
    this.#observer = null;
  }

  #checkDragHandle(e: PointerEvent) {
    const handle = (e.composedPath() as HTMLElement[]).find(el => el.getAttribute?.('bp-draggable') === 'handle');
    const source = (e.composedPath()[0] as HTMLElement).closest?.('[draggable]') as HTMLElement;
    if (!handle && source?.querySelector('[bp-draggable=handle]')) {
      e.preventDefault();
    }
  }

  #addDragEventListeners(signal: AbortSignal) {
    this.#items
      .filter(i => !i.bpDraggableItem)
      .forEach(item => {
        item.bpDraggableItem = 'item';
        item.addEventListener('drag', (e: DragEvent) => this.#handleDrag(e), { signal });
        item.addEventListener('dragstart', (e: DragEvent) => this.#handleDragStart(e), { signal });
        item.addEventListener('dragover', (e: DragEvent) => this.#handleDragOver(e), { signal });
        item.addEventListener('drop', (e: DragEvent) => this.#handleDrop(e), { signal });
        item.addEventListener('dragenter', (e: DragEvent) => this.#handleDragEnter(e), { signal });
        item.addEventListener('dragleave', (e: DragEvent) => this.#handleDragLeave(e), { signal });
        item.addEventListener('dragend', (e: DragEvent) => this.#handleDragEnd(e), { signal });
      });

    this.#dropZones
      .filter(i => !i.bpDraggableItem)
      .forEach(item => {
        item.bpDraggableItem = 'dropzone';
        item.addEventListener('dragover', (e: DragEvent) => this.#handleDragOver(e), { signal });
        item.addEventListener('dragleave', (e: DragEvent) => this.#handleDragLeave(e), { signal });
        item.addEventListener('drop', (e: DragEvent) => this.#handleDrop(e), { signal });
      });
  }

  #dispatchDraggableChange(host: HTMLElement, detail: BpDraggableChangeEvent) {
    host.dispatchEvent(new CustomEvent(`bp-draggable-${detail.type}`, { detail, bubbles: true }));
  }

  #handleDrag(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    this.#dispatchDraggableChange(target, { source: target, type: 'drag' });
  }

  #handleDragEnd(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    target.removeAttribute('bp-draggable');
    this.#dispatchDraggableChange(target, { source: target, type: 'end' });
  }

  #handleDragStart(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    DraggableListController.#dragSrcEl = target;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setDragImage(target, 0, 0);
    addAttributeValue(target, 'bp-draggable', 'active');
    this.#dispatchDraggableChange(target, { source: target, type: 'start' });
  }

  #handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
    const target = e.currentTarget as HTMLElement;

    if (DraggableListController.#dragSrcEl !== target) {
      addAttributeValue(target, 'bp-draggable', 'target');
    }

    this.#dispatchDraggableChange(target, { source: target, type: 'over' });
  }

  #handleDrop(e: DragEvent) {
    const source = DraggableListController.#dragSrcEl;
    const target = e.currentTarget as HTMLElement;
    if (source) {
      removeAttributeValue(source, 'bp-draggable', 'active');
    }
    removeAttributeValue(target, 'bp-draggable', 'target');
    this.#dispatchDraggableChange(target, { source, target, type: 'drop' });
  }

  #handleDragEnter(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    this.#dispatchDraggableChange(target, { source: target, type: 'enter' });
  }

  #handleDragLeave(e: DragEvent) {
    const target = e.currentTarget as HTMLElement;
    removeAttributeValue(target, 'bp-draggable', 'target');
    this.#dispatchDraggableChange(target, { source: target, type: 'leave' });
  }
}
