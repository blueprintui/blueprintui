import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNavGroup, BpNavItem } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-nav-group', () => {
  let fixture: HTMLElement;
  let element: BpNavGroup;
  let items: BpNavItem[];

  beforeEach(async () => {
    fixture = await createFixture(
      html`<bp-nav-group>
        <bp-nav-item>Home</bp-nav-item>
        <bp-nav-item>Submit</bp-nav-item>
        <bp-nav-item>Settings</bp-nav-item>
      </bp-nav-group>`
    );
    element = fixture.querySelector<BpNavGroup>('bp-nav-group');
    items = Array.from(fixture.querySelectorAll<BpNavItem>('bp-nav-item'));
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-nav-group')).toBe(BpNavGroup);
  });

  it('should assign first item to starting slot', async () => {
    await elementIsStable(element);
    expect(items[0].slot).toBe('start');
  });

  it('should have base role type of treeitem', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('treeitem');
  });

  it('should not assign all other items to any slot', async () => {
    await elementIsStable(element);
    expect(items[1].slot).toBe('');
    expect(items[2].slot).toBe('');
  });

  it('should hide the group if not expanded', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').hidden).toBe(true);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').inert).toBe(true);
    expect(element._internals.ariaExpanded).toBe('false');
    expect(element.matches(':--expanded')).toBe(false);
  });

  it('should show the group if expanded', async () => {
    element.expanded = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').hidden).toBe(false);
    expect(element.shadowRoot.querySelector<HTMLElement>('[role="group"]').inert).toBe(false);
    expect(element._internals.ariaExpanded).toBe('true');
    expect(element.matches(':--expanded')).toBe(true);
  });
});
