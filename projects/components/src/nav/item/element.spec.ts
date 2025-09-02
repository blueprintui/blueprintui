import { html } from 'lit';
import '@blueprintui/components/include/nav.js';
import { BpNavItem } from '@blueprintui/components/nav';
import { elementIsStable, createFixture, removeFixture, emulateClick } from '@blueprintui/test';
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

  it('should support inherited properties from BaseButton', async () => {
    await elementIsStable(element);

    // Test boolean properties with CSS states
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);
    expect(element._internals.ariaDisabled).toBe('true');

    element.pressed = true;
    await elementIsStable(element);
    expect(element.pressed).toBe(true);
    expect(element._internals.ariaPressed).toBe('true');

    element.selected = true;
    await elementIsStable(element);
    expect(element.selected).toBe(true);

    element.expanded = true;
    await elementIsStable(element);
    expect(element.expanded).toBe(true);
    expect(element._internals.ariaExpanded).toBe('true');

    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);

    // Test reflected properties
    element.type = 'submit';
    await elementIsStable(element);
    expect(element.type).toBe('submit');
    expect(element.getAttribute('type')).toBe('submit');

    element.name = 'test-name';
    await elementIsStable(element);
    expect(element.name).toBe('test-name');
    expect(element.getAttribute('name')).toBe('test-name');

    element.value = 'test-value';
    await elementIsStable(element);
    expect(element.value).toBe('test-value');
  });

  it('should handle CSS states properly', async () => {
    await elementIsStable(element);

    // Test disabled state
    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(false);

    // Test pressed state
    element.pressed = true;
    await elementIsStable(element);
    expect(element.matches(':state(pressed)')).toBe(true);

    element.pressed = false;
    await elementIsStable(element);
    expect(element.matches(':state(pressed)')).toBe(false);

    // Test selected state
    element.selected = true;
    await elementIsStable(element);
    expect(element.matches(':state(selected)')).toBe(true);

    element.selected = false;
    await elementIsStable(element);
    expect(element.matches(':state(selected)')).toBe(false);

    // Test expanded state
    element.expanded = true;
    await elementIsStable(element);
    expect(element.matches(':state(expanded)')).toBe(true);

    element.expanded = false;
    await elementIsStable(element);
    expect(element.matches(':state(expanded)')).toBe(false);

    // Test readonly state
    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);

    element.readonly = false;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(false);
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test role
    expect(element._internals.role).toBe('treeitem');

    // Test focus management
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should handle click interactions', async () => {
    await elementIsStable(element);

    const clickSpy = jasmine.createSpy('click');
    element.addEventListener('click', clickSpy);

    await emulateClick(element);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpNavItem.formAssociated).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--font-size', '16px');
    element.style.setProperty('--border', '2px solid blue');
    element.style.setProperty('--border-left', '3px solid green');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
    expect(element.style.getPropertyValue('--border')).toBe('2px solid blue');
    expect(element.style.getPropertyValue('--border-left')).toBe('3px solid green');
  });

  it('should handle slot changes and assign icons to icon slot', async () => {
    await elementIsStable(element);

    // Initial state - icon should be assigned to icon slot
    expect(icon.slot).toBe('icon');

    // Add a new icon dynamically
    const newIcon = document.createElement('bp-icon');
    newIcon.setAttribute('name', 'settings');
    element.appendChild(newIcon);

    await elementIsStable(element);

    // The new icon should also be assigned to the icon slot
    expect(newIcon.slot).toBe('icon');
  });

  it('should handle multiple icons in slot changes', async () => {
    await elementIsStable(element);

    // Add multiple icons
    const icon1 = document.createElement('bp-icon');
    icon1.setAttribute('name', 'settings');
    const icon2 = document.createElement('bp-icon');
    icon2.setAttribute('name', 'user');

    element.appendChild(icon1);
    element.appendChild(icon2);

    await elementIsStable(element);

    // All icons should be assigned to the icon slot
    expect(icon.slot).toBe('icon');
    expect(icon1.slot).toBe('icon');
    expect(icon2.slot).toBe('icon');
  });

  it('should maintain icon slot assignment after property changes', async () => {
    await elementIsStable(element);

    // Change some properties
    element.disabled = true;
    element.selected = true;
    element.expanded = true;

    await elementIsStable(element);

    // Icon should still be assigned to icon slot
    expect(icon.slot).toBe('icon');
  });
});
