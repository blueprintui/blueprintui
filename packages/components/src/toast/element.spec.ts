
import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
import { BpToast } from '@blueprintui/components/toast';
import '@blueprintui/components/include/toast.js';

describe('tag element', () => {
  let fixture: HTMLElement;
  let element: BpToast;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-toast>tag</bp-toast>`);
    element = fixture.querySelector<BpToast>('bp-toast');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-toast')).toBe(BpToast);
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });
});
