import { html } from 'lit';
import '@blueprintui/components/include/badge.js';
import { BpBadge } from '@blueprintui/components/badge';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-badge', () => {
  let fixture: HTMLElement;
  let element: BpBadge;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-badge>10</bp-badge>`);
    element = fixture.querySelector<BpBadge>('bp-badge');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-badge')).toBe(BpBadge);
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });
});
