import { ReactiveController, ReactiveElement } from 'lit';
import { addAttributeValue, removeAttributeValue } from '../utils/dom.js';
import { onChildListMutation } from '../utils/events.js';

let dragSrcEl: HTMLElement | null = null;

export type DraggableItem = HTMLElement & { bpDraggableItem?: 'item' | 'dropzone' };

export function draggableList<T extends ReactiveElement>(
  fn?: (host: T) => DraggableListControllerConfig
): ClassDecorator {
  return (target: any) => {
    return target.addInitializer((instance: T) => new DraggableListController(instance, fn));
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
  get #items() {
    return Array.from(this.#config.items);
  }

  get #dropZones() {
    return Array.from(this.#config.dropZones);
  }

  #observer: MutationObserver;

  get #config(): DraggableListControllerConfig {
    return {
      layout: 'both',
      manageFocus: true,
      manageTabindex: false,
      ...this.fn(this.host)
    };
  }

  constructor(private host: T, private fn: (host: T) => DraggableListControllerConfig) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#addDragEventListeners();
    this.host.addEventListener('pointerdown', (e: any) => this.#checkDragHandle(e));
    this.#observer = onChildListMutation(this.host, mutation => {
      if (mutation) {
        const items = (Array.from(mutation.addedNodes) as HTMLElement[]).filter(i => i.draggable) as DraggableItem[];
        if (items.length) {
          this.#addDragEventListeners();
        }
      }
    });
  }

  hostDisconnected() {
    this.#observer?.disconnect();
  }

  #checkDragHandle(e: any) {
    const handle = Array.from(e.composedPath()).find(
      (e: any) => e.getAttribute && e.getAttribute('bp-crane') === 'handle'
    ) as HTMLElement;
    const source = e.composedPath()[0].closest('[draggable]') as HTMLElement;
    if (!handle && source?.querySelector('[bp-crane=handle]')) {
      e.preventDefault();
    }
  }

  #addDragEventListeners() {
    this.#items
      .filter(i => !i.bpDraggableItem)
      .forEach(item => {
        item.bpDraggableItem = 'item';
        item.addEventListener('drag', handleDrag, false);
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('dragend', handleDragEnd, false);
      });

    this.#dropZones
      .filter(i => !i.bpDraggableItem)
      .forEach(item => {
        item.bpDraggableItem = 'dropzone';
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
      });
  }
}

// todo: these events should emit directly from the host element of the controller, not the item itself
async function dispatchDraggableChange(host: HTMLElement, detail: BpDraggableChangeEvent) {
  if ((host as any)?.updateComplete) {
    await (host as any).updateComplete;
  }

  host.dispatchEvent(new CustomEvent(`bp-crane-${detail.type}`, { detail, bubbles: true }));
}

function handleDrag(e: any) {
  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'drag' });
}

function handleDragEnd(e: any) {
  e.currentTarget.removeAttribute('bp-crane');
  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'end' });
}

function handleDragStart(e: any) {
  dragSrcEl = e.currentTarget;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setDragImage(e.currentTarget, 0, 0);
  addAttributeValue(e.currentTarget, 'bp-crane', 'active');
  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'start' });
}

function handleDragOver(e: any) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  e.dataTransfer.dropEffect = 'move';

  if (dragSrcEl !== e.currentTarget) {
    addAttributeValue(e.currentTarget, 'bp-crane', 'target');
  }

  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'over' });
  return false;
}

function handleDrop(e: any) {
  const source = dragSrcEl;
  const target = e.currentTarget;
  removeAttributeValue(source, 'bp-crane', 'active');
  removeAttributeValue(target, 'bp-crane', 'target');
  dispatchDraggableChange(e.currentTarget, { source, target, type: 'drop' });
  return false;
}

function handleDragEnter(e: any) {
  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'enter' });
}

function handleDragLeave(e: any) {
  removeAttributeValue(e.currentTarget, 'bp-crane', 'target');
  dispatchDraggableChange(e.currentTarget, { source: e.currentTarget, type: 'leave' });
}
