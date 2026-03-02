import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '../include/draggable-list.js';
import { BpDraggableDropzone } from './index.js';

describe('bp-draggable-dropzone', () => {
  let fixture: HTMLElement;
  let element: BpDraggableDropzone;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-draggable-list>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <bp-draggable-dropzone></bp-draggable-dropzone>
      </bp-draggable-list>
    `);
    element = fixture.querySelector<BpDraggableDropzone>('bp-draggable-dropzone')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-draggable-dropzone')).toBe(BpDraggableDropzone);
  });

  it('should set bp-draggable="dropzone" attribute on connect', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-draggable')).toBe('dropzone');
  });

  it('should render a div with part="internal"', async () => {
    const internal = element.shadowRoot!.querySelector('[part=internal]');
    expect(internal).not.toBeNull();
    expect(internal!.tagName.toLowerCase()).toBe('div');
  });

  it('should render a slot inside the internal div', async () => {
    const slot = element.shadowRoot!.querySelector('[part=internal] slot');
    expect(slot).not.toBeNull();
  });

  it('should use display contents style', async () => {
    expect(getComputedStyle(element).display).toBe('contents');
  });
});

describe('bp-draggable-dropzone standalone', () => {
  let fixture: HTMLElement;
  let element: BpDraggableDropzone;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-draggable-dropzone></bp-draggable-dropzone>`);
    element = fixture.querySelector<BpDraggableDropzone>('bp-draggable-dropzone')!;
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should set bp-draggable="dropzone" attribute when used standalone', async () => {
    expect(element.getAttribute('bp-draggable')).toBe('dropzone');
  });

  it('should render shadow DOM structure standalone', async () => {
    expect(element.shadowRoot!.querySelector('[part=internal]')).not.toBeNull();
    expect(element.shadowRoot!.querySelector('slot')).not.toBeNull();
  });
});
