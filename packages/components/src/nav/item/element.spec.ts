import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNavItem } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpIcon } from '@blueprintui/icons';

describe('bp-nav-item', () => {
  let fixture: HTMLElement;
  let element: BpNavItem;
  let icon: BpIcon;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-nav-item> <bp-icon name="home"></bp-icon> Home</bp-nav-item>`);
    element = fixture.querySelector<BpNavItem>('bp-nav-item');
    icon = fixture.querySelector<BpIcon>('bp-icon');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-nav-item')).toBe(BpNavItem);
  });

  it('should have base role type of treeitem', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('treeitem');
  });

  it('should assign icon to icon slot', async () => {
    await elementIsStable(element);
    expect(icon.slot).toBe('icon');
  });
});
