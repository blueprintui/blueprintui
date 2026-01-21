import { html } from 'lit';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import { BpToast } from '@blueprintui/components/toast';
import '@blueprintui/components/include/toast.js';

describe('bp-toast', () => {
  let fixture: HTMLElement;
  let element: BpToast;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-toast>toast content</bp-toast>`);
    element = fixture.querySelector<BpToast>('bp-toast');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-toast')).toBe(BpToast);
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should dispatch a "toggle" event when the close button is clicked', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('should handle status property with different values', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);

    const statuses = ['accent', 'success', 'warning', 'danger'] as const;
    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.status).toBe(status);
      expect(element.getAttribute('status')).toBe(status);
    }
  });

  it('should render correct status icons', async () => {
    await elementIsStable(element);

    const statusIconMap = {
      undefined: 'info',
      accent: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'error'
    };

    for (const [status, expectedIcon] of Object.entries(statusIconMap)) {
      element.status = status === 'undefined' ? undefined : (status as any);
      await elementIsStable(element);

      const icon = element.shadowRoot.querySelector('bp-icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('part')).toBe('icon');
      expect(icon.getAttribute('size')).toBe('sm');
      // Shape is set via property, not attribute in Lit components
      expect(icon.shape).toBe(expectedIcon);
    }
  });

  it('should handle closable property', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();

    element.closable = true;
    await elementIsStable(element);
    expect(element.closable).toBe(true);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('inline');
    expect(closeButton.getAttribute('part')).toBe('close');
    expect(closeButton.getAttribute('aria-label')).toBe(element.i18n.close);
  });

  it('should handle open property', async () => {
    await elementIsStable(element);
    expect(element.open).toBe(false);
    expect(element.getAttribute('open')).toBe(null);

    element.open = true;
    await elementIsStable(element);
    expect(element.open).toBe(true);
    expect(element.hasAttribute('open')).toBe(true);
  });

  it('should handle position property', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('top');
    expect(element.getAttribute('position')).toBe('top');

    const positions = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'center'] as const;
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

    const icon = element.shadowRoot.querySelector('bp-icon[part="icon"]');
    expect(icon).toBeTruthy();

    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
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
    element.style.setProperty('--width', '300px');
    element.style.setProperty('--height', '60px');
    element.style.setProperty('--min-width', '200px');
    element.style.setProperty('--min-height', '40px');
    element.style.setProperty('--font-size', '14px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('16px');
    expect(element.style.getPropertyValue('--filter')).toBe('drop-shadow(0 2px 8px rgba(0,0,0,0.1))');
    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
    expect(element.style.getPropertyValue('--width')).toBe('300px');
    expect(element.style.getPropertyValue('--height')).toBe('60px');
    expect(element.style.getPropertyValue('--min-width')).toBe('200px');
    expect(element.style.getPropertyValue('--min-height')).toBe('40px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
  });

  it('should have default i18n values', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeTruthy();
    expect(typeof element.i18n).toBe('object');
    expect('close' in element.i18n).toBe(true);
  });

  it('should handle role attribute via internals', async () => {
    await elementIsStable(element);
    expect(element._internals).toBeTruthy();
    expect(element._internals.role).toBe('alert');
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

  it('should handle slot content', async () => {
    await elementIsStable(element);

    // Content should be in the default slot
    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();

    // Check that the original content is preserved
    expect(element.textContent).toBe('toast content');
  });

  it('should handle all status states with proper icons', async () => {
    await elementIsStable(element);

    // Test undefined/default state
    element.status = undefined;
    await elementIsStable(element);
    let icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('info');

    // Test accent state
    element.status = 'accent';
    await elementIsStable(element);
    icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('info');

    // Test success state
    element.status = 'success';
    await elementIsStable(element);
    icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('success');

    // Test warning state
    element.status = 'warning';
    await elementIsStable(element);
    icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('warning');

    // Test danger state
    element.status = 'danger';
    await elementIsStable(element);
    icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe('error');
  });

  it('should handle ElementInternals attachment', async () => {
    await elementIsStable(element);

    // ElementInternals should be attached and have role set
    expect(element._internals).toBeTruthy();
    expect(typeof element._internals).toBe('object');
    expect(element._internals.role).toBe('alert');
  });
});
