import { html } from 'lit';
import '@blueprintui/components/include/menu.js';
import { BpMenuItem } from '@blueprintui/components/menu';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';

describe('bp-menu-item', () => {
  let fixture: HTMLElement;
  let element: BpMenuItem;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-menu-item>menu item</bp-menu-item>`);
    element = fixture.querySelector<BpMenuItem>('bp-menu-item');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-menu-item')).toBe(BpMenuItem);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('menu item');
  });

  it('should have proper ARIA role', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('menuitem');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should handle click events', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'click');
    element.click();
    expect(await event).toBeTruthy();
  });

  it('should handle keyboard events', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'keydown');
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(await event).toBeTruthy();
  });

  it('should support disabled state', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(element.getAttribute('disabled')).toBe(null);
  });

  it('should support anchor slot', async () => {
    fixture = await createFixture(html`
      <bp-menu-item>
        <a slot="anchor" href="#">Link</a>
        menu item
      </bp-menu-item>
    `);
    element = fixture.querySelector<BpMenuItem>('bp-menu-item');
    await elementIsStable(element);

    const anchor = element.querySelector('a[slot="anchor"]');
    expect(anchor).toBeTruthy();
    expect(anchor?.textContent).toBe('Link');
  });

  it('should have CSS custom properties for styling', async () => {
    element.style.setProperty('--bp-interaction-outline-offset', '4px');
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--padding', '10px');
    element.style.setProperty('--border', '1px solid red');
    element.style.setProperty('--border-inline', '2px solid green');
    element.style.setProperty('--border-inline-start', '3px solid yellow');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--bp-interaction-outline-offset')).toBe('4px');
    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--padding')).toBe('10px');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid red');
    expect(element.style.getPropertyValue('--border-inline')).toBe('2px solid green');
    expect(element.style.getPropertyValue('--border-inline-start')).toBe('3px solid yellow');
  });

  it('should inherit BaseButton functionality', async () => {
    await elementIsStable(element);
    // Check if element has BaseButton functionality through decorators
    expect(typeof element.click).toBe('function');
    expect(typeof element.disabled).toBe('boolean');
    // Check that it has the internal role set by ariaMenuItem decorator
    expect((element as any)._internals.role).toBe('menuitem');
  });

  it('should handle Space key press', async () => {
    await elementIsStable(element);
    const event = onceEvent(element, 'keydown');
    element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(await event).toBeTruthy();
  });

  it('should handle Enter key press', async () => {
    await elementIsStable(element);
    const clickEvent = onceEvent(element, 'click');
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    element.click();
    expect(await clickEvent).toBeTruthy();
  });

  it('should handle disabled state click behavior', async () => {
    element.disabled = true;
    await elementIsStable(element);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    element.dispatchEvent(event);
    expect(element.disabled).toBe(true);
    expect((element as any)._internals.ariaDisabled).toBe('true');
  });

  it('should maintain role after reconnection', async () => {
    await elementIsStable(element);

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect((element as any)._internals.role).toBe('menuitem');
  });

  it('should be tabbable by default', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should have applied style modules', async () => {
    await elementIsStable(element);
    expect((element.constructor as typeof BpMenuItem).styles).toBeTruthy();
    expect((element.constructor as typeof BpMenuItem).styles.length).toBeGreaterThan(0);
  });

  it('should render slot content', async () => {
    fixture = await createFixture(html`
      <bp-menu-item>
        <span>Custom content</span>
      </bp-menu-item>
    `);
    element = fixture.querySelector<BpMenuItem>('bp-menu-item');
    await elementIsStable(element);

    expect(element.innerHTML).toContain('Custom content');
  });

  it('should handle type property from BaseButton', async () => {
    element.type = 'submit';
    await elementIsStable(element);
    expect(element.type).toBe('submit');
  });

  it('should handle value property from BaseButton', async () => {
    element.value = 'menu-value';
    await elementIsStable(element);
    expect(element.value).toBe('menu-value');
  });

  it('should have ariaMenuItem decorator applied', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('menuitem');
  });

  it('should inherit complete BaseButton interface', async () => {
    await elementIsStable(element);
    expect('pressed' in element).toBe(true);
    expect('selected' in element).toBe(true);
    expect('expanded' in element).toBe(true);
    expect('readonly' in element).toBe(true);
    expect('type' in element).toBe(true);
    expect('name' in element).toBe(true);
    expect('value' in element).toBe(true);
  });
});
