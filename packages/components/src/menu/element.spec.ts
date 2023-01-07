import { html } from 'lit';
import '@blueprintui/components/include/menu.js';
import { BpMenu, BpMenuItem } from '@blueprintui/components/menu';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';

describe('bp-menu', () => {
  let fixture: HTMLElement;
  let element: BpMenu;
  let items: NodeListOf<BpMenuItem>;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-menu>
        <bp-menu-item>1</bp-menu-item>
        <bp-menu-item>2</bp-menu-item>
        <bp-menu-item>3</bp-menu-item>
      </bp-menu>
    `);
    element = fixture.querySelector<BpMenu>('bp-menu');
    items = fixture.querySelectorAll<BpMenuItem>('bp-menu-item');
    await elementIsStable(element);

    // trigger initialization
    element.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    await new Promise(r => setTimeout(r, 0));
    items[0].focus();
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-menu')).toBe(BpMenu);
  });

  it('should set activate a item on click', async () => {
    await elementIsStable(element);
    items[2].dispatchEvent(new Event('pointerup', { bubbles: true }));
    expect(items[0].getAttribute('tabindex')).toBe('-1');
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('0');
  });

  it('should support arrow key navigation', async () => {
    expect(items[0].getAttribute('tabindex')).toBe('0');
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('-1');

    items[2].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);

    expect(items[0].getAttribute('tabindex')).toBe('-1');
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('0');

    items[2].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    items[1].dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp', bubbles: true }));
    await elementIsStable(element);

    expect(items[0].getAttribute('tabindex')).toBe('0');
    expect(items[1].getAttribute('tabindex')).toBe('-1');
    expect(items[2].getAttribute('tabindex')).toBe('-1');
  });
});
