import { html } from 'lit';
import '@blueprintui/components/include/header.js';
import { BpHeader } from '@blueprintui/components/header';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-header', () => {
  let fixture: HTMLElement;
  let element: BpHeader;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-header>
        <bp-header-item>item</bp-header-item>
        <bp-header-item>item</bp-header-item>
      </bp-header>
    `);
    element = fixture.querySelector<BpHeader>('bp-header');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-header')).toBe(BpHeader);
  });

  it('should have a role of navigation for header', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('navigation');
  });
});
