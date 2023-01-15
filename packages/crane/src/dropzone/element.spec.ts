import { html } from 'lit';
import '@blueprintui/crane/include/crane.js';
import { BpDropzone } from '@blueprintui/crane/dropzone';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/crane/test';

describe('bp-dropzone', () => {
  let fixture: HTMLElement;
  let element: BpDropzone;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-crane>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <bp-dropzone></bp-dropzone>
      </bp-crane>
    `);
    element = fixture.querySelector<BpDropzone>('bp-dropzone');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dropzone')).toBe(BpDropzone);
  });

  it('should mark items as draggable items', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-crane')).toBe('dropzone');
  });
});
