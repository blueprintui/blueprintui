import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { BpTag } from '@blueprintui/components/tag';
import '@blueprintui/components/include/tag.js';

describe('tag element', () => {
  let fixture: HTMLElement;
  let element: BpTag;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tag>tag</bp-tag>`);
    element = fixture.querySelector<BpTag>('bp-tag');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('tag');
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });
});
