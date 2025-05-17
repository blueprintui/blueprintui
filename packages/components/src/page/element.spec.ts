import { html } from 'lit';
import { BpPage } from '@blueprintui/components/page';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import '@blueprintui/components/include/page.js';

describe('bp-page', () => {
  let fixture: HTMLElement;
  let element: BpPage;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-page> </bp-page> `);
    element = fixture.querySelector<BpPage>('bp-page');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-page')).toBe(BpPage);
  });
});
