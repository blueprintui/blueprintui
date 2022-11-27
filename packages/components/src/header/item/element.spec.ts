import { html } from 'lit';
import '@blueprintui/components/include/header.js';
import { BpHeaderItem } from '@blueprintui/components/header';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-header', () => {
  let fixture: HTMLElement;
  let element: BpHeaderItem;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-header>
        <bp-header-item>item</bp-header-item>
        <bp-header-item>item</bp-header-item>
      </bp-header>
    `);
    element = fixture.querySelector<BpHeaderItem>('bp-header-item');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-header-item')).toBe(BpHeaderItem);
  });

  it('should have a role of button for header item', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('button');
  });
});
