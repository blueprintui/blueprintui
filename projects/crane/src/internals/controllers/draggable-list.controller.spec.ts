import { html, LitElement, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { draggableList } from './draggable-list.controller.js';
import { BpDraggableDropzone } from '../../dropzone/element.js';

customElements.get('bp-draggable-dropzone') ?? customElements.define('bp-draggable-dropzone', BpDraggableDropzone);

@draggableList<DraggableListControllerTestElement>(host => ({
  manageFocus: true,
  manageTabindex: true,
  items: host.items,
  dropZones: host.dropZones
}))
@customElement('draggable-list-controller-test-element')
class DraggableListControllerTestElement extends LitElement {
  static styles = [
    css`
      :host,
      slot {
        display: contents;
      }
    `
  ];

  get items() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > *:not(bp-draggable-dropzone)'));
  }

  get dropZones() {
    return Array.from(this.querySelectorAll<HTMLElement>(':scope > bp-draggable-dropzone'));
  }

  render() {
    return html`<slot></slot>`;
  }
}

describe('draggable-list.controller', () => {
  let element: DraggableListControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <draggable-list-controller-test-element>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </draggable-list-controller-test-element>
    `);
    element = fixture.querySelector<DraggableListControllerTestElement>('draggable-list-controller-test-element')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the controller on the element', async () => {
    expect(element).toBeTruthy();
    expect(element.items.length).toBe(3);
    expect(element.dropZones.length).toBe(1);
  });

  it('should dispatch bp-draggable-start on dragstart', async () => {
    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-start', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    const item = element.items[0];
    item.draggable = true;
    item.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));

    const event = await eventPromise;
    expect(event.detail.type).toBe('start');
    expect(event.detail.source).toBe(item);
  });

  it('should set bp-draggable="active" on the dragged item during dragstart', async () => {
    const item = element.items[0];
    item.draggable = true;
    item.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));
    await elementIsStable(element);

    expect(item.getAttribute('bp-draggable')?.includes('active')).toBe(true);
  });

  it('should dispatch bp-draggable-drag on drag', async () => {
    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-drag', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    const item = element.items[0];
    item.draggable = true;
    item.dispatchEvent(new DragEvent('drag', { bubbles: true }));

    const event = await eventPromise;
    expect(event.detail.type).toBe('drag');
  });

  it('should dispatch bp-draggable-enter on dragenter', async () => {
    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-enter', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    const item = element.items[1];
    item.draggable = true;
    item.dispatchEvent(new DragEvent('dragenter', { bubbles: true }));

    const event = await eventPromise;
    expect(event.detail.type).toBe('enter');
  });

  it('should dispatch bp-draggable-leave on dragleave and remove target attribute', async () => {
    const item = element.items[1];
    item.draggable = true;
    item.setAttribute('bp-draggable', 'target');

    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-leave', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    item.dispatchEvent(new DragEvent('dragleave', { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.type).toBe('leave');
    expect(item.getAttribute('bp-draggable')?.includes('target')).toBeFalsy();
  });

  it('should dispatch bp-draggable-over on dragover', async () => {
    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-over', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    const item = element.items[1];
    item.draggable = true;
    item.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: new DataTransfer() }));

    const event = await eventPromise;
    expect(event.detail.type).toBe('over');
  });

  it('should dispatch bp-draggable-end on dragend and clear bp-draggable attribute', async () => {
    const item = element.items[0];
    item.draggable = true;
    item.setAttribute('bp-draggable', 'active');

    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-end', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    item.dispatchEvent(new DragEvent('dragend', { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.type).toBe('end');
    expect(item.getAttribute('bp-draggable')).toBeNull();
  });

  it('should dispatch bp-draggable-drop on drop with source and target', async () => {
    const source = element.items[0];
    const target = element.items[2];
    source.draggable = true;
    target.draggable = true;

    source.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));

    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-drop', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    target.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.type).toBe('drop');
    expect(event.detail.source).toBe(source);
    expect(event.detail.target).toBe(target);
  });

  it('should support drag events on drop zones', async () => {
    const dropzone = element.dropZones[0];

    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-over', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    dropzone.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: new DataTransfer() }));
    const event = await eventPromise;
    expect(event.detail.type).toBe('over');
  });

  it('should add bp-draggable="target" on dragover for non-source elements', async () => {
    const source = element.items[0];
    const target = element.items[1];
    source.draggable = true;
    target.draggable = true;

    source.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));
    target.dispatchEvent(new DragEvent('dragover', { bubbles: true, dataTransfer: new DataTransfer() }));

    expect(target.getAttribute('bp-draggable')?.includes('target')).toBe(true);
  });

  it('should attach listeners to dynamically added items', async () => {
    const newItem = document.createElement('button');
    newItem.textContent = 'new';
    newItem.draggable = true;
    element.appendChild(newItem);

    await new Promise(r => setTimeout(r, 50));

    const eventPromise = new Promise<CustomEvent>(resolve => {
      element.addEventListener('bp-draggable-drag', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    newItem.dispatchEvent(new DragEvent('drag', { bubbles: true }));
    const event = await eventPromise;
    expect(event.detail.type).toBe('drag');
  });
});

describe('draggable-list.controller multi list', () => {
  let fixture: HTMLElement;
  let listA: DraggableListControllerTestElement;
  let listB: DraggableListControllerTestElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <section>
        <draggable-list-controller-test-element class="list-a">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <bp-draggable-dropzone></bp-draggable-dropzone>
        </draggable-list-controller-test-element>
        <draggable-list-controller-test-element class="list-b">
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <bp-draggable-dropzone></bp-draggable-dropzone>
        </draggable-list-controller-test-element>
      </section>
    `);
    listA = fixture.querySelector<DraggableListControllerTestElement>('.list-a')!;
    listB = fixture.querySelector<DraggableListControllerTestElement>('.list-b')!;
    await elementIsStable(listA);
    await elementIsStable(listB);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should track drag source across separate crane instances', async () => {
    const sourceItem = listA.items[0];
    const targetItem = listB.items[1];
    sourceItem.draggable = true;
    targetItem.draggable = true;

    sourceItem.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));

    const eventPromise = new Promise<CustomEvent>(resolve => {
      fixture.addEventListener('bp-draggable-drop', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    targetItem.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    const event = await eventPromise;

    expect(event.detail.type).toBe('drop');
    expect(event.detail.source).toBe(sourceItem);
    expect(event.detail.target).toBe(targetItem);
  });

  it('should allow reordering via insertBefore after cross-list drop', async () => {
    const sourceItem = listA.items[0];
    const targetItem = listB.items[1];
    sourceItem.draggable = true;
    targetItem.draggable = true;

    sourceItem.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));

    const eventPromise = new Promise<CustomEvent>(resolve => {
      fixture.addEventListener('bp-draggable-drop', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    targetItem.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    const event = await eventPromise;

    expect(() => {
      event.detail.target.parentElement.insertBefore(event.detail.source, event.detail.target);
    }).not.toThrow();

    const listBButtons = Array.from(listB.querySelectorAll('button'));
    expect(listBButtons.map(b => b.textContent)).toEqual(['4', '1', '5', '6']);
  });

  it('should drop from item onto a dropzone in another list', async () => {
    const sourceItem = listA.items[0];
    const targetDropzone = listB.dropZones[0];
    sourceItem.draggable = true;

    sourceItem.dispatchEvent(new DragEvent('dragstart', { bubbles: true, dataTransfer: new DataTransfer() }));

    const eventPromise = new Promise<CustomEvent>(resolve => {
      fixture.addEventListener('bp-draggable-drop', (e: Event) => resolve(e as CustomEvent), { once: true });
    });

    targetDropzone.dispatchEvent(new DragEvent('drop', { bubbles: true }));
    const event = await eventPromise;

    expect(event.detail.type).toBe('drop');
    expect(event.detail.source).toBe(sourceItem);
    expect(event.detail.target).toBe(targetDropzone);
  });
});

describe('draggable-list.controller drag handle', () => {
  let element: DraggableListControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <draggable-list-controller-test-element>
        <div draggable="true"><span bp-draggable="handle">grip</span><span class="content">item 1</span></div>
        <div draggable="true"><span bp-draggable="handle">grip</span><span class="content">item 2</span></div>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </draggable-list-controller-test-element>
    `);
    element = fixture.querySelector<DraggableListControllerTestElement>('draggable-list-controller-test-element')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should prevent drag when clicking non-handle area of a handle-enabled item', async () => {
    const content = element.querySelector('.content') as HTMLElement;
    const event = new PointerEvent('pointerdown', { bubbles: true, composed: true });
    const spy = spyOn(event, 'preventDefault');
    content.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should allow drag when clicking the handle itself', async () => {
    const handle = element.querySelector('[bp-draggable=handle]') as HTMLElement;
    const event = new PointerEvent('pointerdown', { bubbles: true, composed: true });
    const spy = spyOn(event, 'preventDefault');
    handle.dispatchEvent(event);
    expect(spy).not.toHaveBeenCalled();
  });
});
