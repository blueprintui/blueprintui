import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '../include/draggable-list.js';
import { BpDraggableList } from './index.js';

describe('bp-draggable-list', () => {
  let fixture: HTMLElement;
  let element: BpDraggableList;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-draggable-list>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </bp-draggable-list>
    `);
    element = fixture.querySelector<BpDraggableList>('bp-draggable-list')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-draggable-list')).toBe(BpDraggableList);
  });

  it('should mark items as draggable items', async () => {
    await elementIsStable(element);
    expect(element.items.length).toBe(3);
    expect(element.items.every(i => i.draggable)).toBe(true);
  });

  it('should not mark drop zones as draggable', async () => {
    await elementIsStable(element);
    expect(element.dropZones.length).toBe(1);
    expect(element.dropZones.every(i => i.draggable)).toBe(false);
  });

  it('should mark dynamically added children as draggable via slotchange', async () => {
    const newButton = document.createElement('button');
    newButton.textContent = 'dynamic';
    element.appendChild(newButton);
    await elementIsStable(element);
    await new Promise(r => setTimeout(r, 0));
    expect(element.items.length).toBe(4);
    expect(newButton.draggable).toBe(true);
  });

  it('should render a slot element', async () => {
    const slot = element.shadowRoot!.querySelector('slot');
    expect(slot).not.toBeNull();
  });

  it('should use display contents style', async () => {
    expect(getComputedStyle(element).display).toBe('contents');
  });
});
