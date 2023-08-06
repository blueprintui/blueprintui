import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNav } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-nav', () => {
  let fixture: HTMLElement;
  let element: BpNav;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-nav expanded>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon>
          <a href="#">item 1</a>
        </bp-nav-item>
        <bp-nav-item selected>
          <bp-icon shape="home"></bp-icon>
          <a href="#">item 2</a>
        </bp-nav-item>
        <bp-nav-item>
          <bp-icon shape="home"></bp-icon>
          item 3
        </bp-nav-item>
      </bp-nav>
    `);
    element = fixture.querySelector<BpNav>('bp-nav');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-nav')).toBe(BpNav);
  });

  it('should have base role type of tree', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tree');
  });
});
