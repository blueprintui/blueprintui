import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '../include/crane.js';
import { BpCrane } from './index.js';

describe('bp-crane', () => {
  let fixture: HTMLElement;
  let element: BpCrane;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-crane>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <bp-dropzone></bp-dropzone>
      </bp-crane>
    `);
    element = fixture.querySelector<BpCrane>('bp-crane');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-crane')).toBe(BpCrane);
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
});
