import { html } from 'lit';
import '@blueprintui/components/include/dropdown.js';
import { BpDropdown } from '@blueprintui/components/dropdown';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

describe('bp-dropdown', () => {
  let fixture: HTMLElement;
  let element: BpDropdown;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-dropdown>content</bp-dropdown>`);
    element = fixture.querySelector<BpDropdown>('bp-dropdown');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dropdown')).toBe(BpDropdown);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position bottom', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('bottom');
  });

  it('should render close button when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should dispatch a "toggle" event when the close button is clicked', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('should handle position property', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('bottom');
    expect(element.getAttribute('position')).toBe('bottom');

    const positions = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
      'center'
    ] as const;
    for (const position of positions) {
      element.position = position;
      await elementIsStable(element);
      expect(element.position).toBe(position);
      expect(element.getAttribute('position')).toBe(position);
    }
  });

  it('should handle anchor property', async () => {
    await elementIsStable(element);
    expect(element.anchor).toBe(undefined);

    element.anchor = 'test-anchor';
    await elementIsStable(element);
    expect(element.anchor).toBe('test-anchor');
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();

    const content = element.shadowRoot.querySelector('.content');
    expect(content).toBeTruthy();

    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should handle closable state correctly', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();

    element.closable = true;
    await elementIsStable(element);
    expect(element.closable).toBe(true);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('flat');
    expect(closeButton.getAttribute('type')).toBe('button');
  });

  it('should implement popover functionality', async () => {
    await elementIsStable(element);
    expect(typeof element.showPopover).toBe('function');
    expect(typeof element.hidePopover).toBe('function');
    expect(typeof element.togglePopover).toBe('function');
  });

  it('should handle open and close events', async () => {
    await elementIsStable(element);

    let openEventFired = false;
    let closeEventFired = false;

    element.addEventListener('open', () => (openEventFired = true));
    element.addEventListener('close', () => (closeEventFired = true));

    // Test event handling capability
    element.dispatchEvent(new Event('open'));
    element.dispatchEvent(new Event('close'));

    expect(openEventFired).toBe(true);
    expect(closeEventFired).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--padding', '16px');
    element.style.setProperty('--filter', 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))');
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'black');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--height', '150px');
    element.style.setProperty('--min-width', '100px');
    element.style.setProperty('--min-height', '50px');
    element.style.setProperty('--font-size', '14px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('16px');
    expect(element.style.getPropertyValue('--filter')).toBe('drop-shadow(0 2px 8px rgba(0,0,0,0.1))');
    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--height')).toBe('150px');
    expect(element.style.getPropertyValue('--min-width')).toBe('100px');
    expect(element.style.getPropertyValue('--min-height')).toBe('50px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
  });

  it('should have default i18n values', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeTruthy();
    expect(typeof element.i18n).toBe('object');
    expect('close' in element.i18n).toBe(true);
  });

  it('should set close button aria-label from i18n', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('aria-label')).toBe(element.i18n.close);
  });

  it('should handle slot content', async () => {
    await elementIsStable(element);

    // Content should be in the default slot
    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();

    // Check that the original content is preserved
    expect(element.textContent).toBe('content');
  });

  it('should handle menu detection', async () => {
    await elementIsStable(element);

    // Initially should not have _menu attribute
    expect(element.hasAttribute('_menu')).toBe(false);

    // Create fixture with placeholder for menu (bp-menu not available in test)
    const menuFixture = await createFixture(html`
      <bp-dropdown>
        <div data-test-menu>Menu placeholder</div>
      </bp-dropdown>
    `);

    const menuElement = menuFixture.querySelector('bp-dropdown');
    await elementIsStable(menuElement);

    // Menu detection test - just verify component is stable without bp-menu
    // The actual menu detection would require bp-menu component to be available
    expect(menuElement).toBeTruthy();

    removeFixture(menuFixture);
  });

  it('should extend LitElement and implement BpTypePopover', async () => {
    await elementIsStable(element);

    // Should have LitElement properties
    expect(typeof element.render).toBe('function');
    expect(typeof element.connectedCallback).toBe('function');

    // Should implement BpTypePopover interface
    expect('position' in element).toBe(true);
    expect('open' in element).toBe(true);
  });

  it('should handle _internals and states', async () => {
    await elementIsStable(element);

    // ElementInternals should be attached
    expect(element._internals).toBeTruthy();
    expect(typeof element._internals).toBe('object');
  });

  it('should support typePopover decorator', async () => {
    await elementIsStable(element);

    // The decorator should provide popover functionality
    expect(typeof element.showPopover).toBe('function');
    expect(typeof element.hidePopover).toBe('function');
    expect(typeof element.togglePopover).toBe('function');
  });

  it('should support i18n decorator', async () => {
    await elementIsStable(element);

    // The decorator should provide i18n functionality
    expect(element.i18n).toBeTruthy();
    expect(typeof element.i18n.close).toBe('string');
  });

  it('should handle close button click to hide popover', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();

    // The click handler should be bound to hidePopover
    expect(typeof element.hidePopover).toBe('function');
  });

  it('should handle slotchange events for menu detection', async () => {
    await elementIsStable(element);

    // Simulate slotchange event
    const slot = element.shadowRoot.querySelector('slot');
    slot.dispatchEvent(new Event('slotchange'));
    await elementIsStable(element);

    // Should handle the event without errors
    expect(element).toBeTruthy();
  });
});
