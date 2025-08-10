import { html } from 'lit';
import '@blueprintui/components/include/panel.js';
import { BpPanel } from '@blueprintui/components/panel';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-panel', () => {
  let fixture: HTMLElement;
  let element: BpPanel;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-panel></bp-panel>`);
    element = fixture.querySelector<BpPanel>('bp-panel');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-panel')).toBe(BpPanel);
  });

  it('should default to size medium (undefined)', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(undefined);
    expect(element.getAttribute('size')).toBe(null);
  });
});
