import { html } from 'lit';
import { BpDialog } from '@blueprintui/components/dialog';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import '@blueprintui/components/include/dialog.js';

describe('bp-dialog', () => {
  let fixture: HTMLElement;
  let element: BpDialog;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-dialog>content</bp-dialog>`);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-dialog')).toBe(BpDialog);
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position center', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('center');
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

  it('should support different size values', async () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    for (const size of sizes) {
      element.size = size;
      await elementIsStable(element);
      expect(element.getAttribute('size')).toBe(size);
    }
  });

  it('should support different position values', async () => {
    const positions = [
      'top-start',
      'top',
      'top-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left',
      'center',
      'right'
    ] as const;

    for (const position of positions) {
      element.position = position;
      await elementIsStable(element);
      expect(element.getAttribute('position')).toBe(position);
    }
  });

  it('should handle modal state', async () => {
    element.modal = true;
    await elementIsStable(element);

    expect(element.modal).toBe(true);
    expect(element.getAttribute('modal')).toBe('');
    expect((element as any)._internals.ariaModal).toBe('true');
  });

  it('should handle open state', async () => {
    element.open = true;
    await elementIsStable(element);

    expect(element.open).toBe(true);
    expect(element.getAttribute('open')).toBe('');
  });

  it('should have default i18n object', () => {
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n).toBe('object');
  });

  it('should allow custom i18n object', async () => {
    const customI18n = { ...element.i18n, close: 'Custom Close' };
    element.i18n = customI18n;
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('aria-label')).toBe('Custom Close');
  });

  it('should render header slot', async () => {
    fixture = await createFixture(html`
      <bp-dialog>
        <div slot="header">Header Content</div>
        Body Content
      </bp-dialog>
    `);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);

    const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
    expect(headerSlot).toBeTruthy();
  });

  it('should render footer slot', async () => {
    fixture = await createFixture(html`
      <bp-dialog>
        Body Content
        <div slot="footer">Footer Content</div>
      </bp-dialog>
    `);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);

    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
    expect(footerSlot).toBeTruthy();
  });

  it('should render default slot for body content', async () => {
    const bodySlot = element.shadowRoot.querySelector('slot:not([name])');
    expect(bodySlot).toBeTruthy();
  });

  it('should have internal part', async () => {
    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal?.tagName).toBe('DIV');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--padding', '20px');
    element.style.setProperty('--filter', 'blur(5px)');
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'black');
    element.style.setProperty('--width', '500px');
    element.style.setProperty('--height', '300px');
    element.style.setProperty('--min-width', '200px');
    element.style.setProperty('--min-height', '150px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--animation-duration', '0.5s');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('20px');
    expect(element.style.getPropertyValue('--filter')).toBe('blur(5px)');
    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
    expect(element.style.getPropertyValue('--width')).toBe('500px');
    expect(element.style.getPropertyValue('--height')).toBe('300px');
    expect(element.style.getPropertyValue('--min-width')).toBe('200px');
    expect(element.style.getPropertyValue('--min-height')).toBe('150px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--animation-duration')).toBe('0.5s');
  });

  it('should support typePopover methods', async () => {
    expect(typeof element.showPopover).toBe('function');
    expect(typeof element.hidePopover).toBe('function');
    expect(typeof element.togglePopover).toBe('function');
  });

  it('should add bp-layer state to internals', async () => {
    expect((element as any)._internals.states.has('bp-layer')).toBe(true);
  });

  it('should support popover commands', async () => {
    // Test that the element supports command events by checking the method exists
    expect(typeof element.togglePopover).toBe('function');
    expect(typeof element.showPopover).toBe('function');
    expect(typeof element.hidePopover).toBe('function');
  });

  it('should handle close button properties correctly', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('inline');
    expect(closeButton.getAttribute('type')).toBe('button');
    expect(closeButton.hasAttribute('aria-label')).toBe(true);
  });

  it('should maintain state after reconnection', async () => {
    element.modal = true;
    element.size = 'lg';
    element.position = 'top';
    await elementIsStable(element);

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect(element.modal).toBe(true);
    expect(element.size).toBe('lg');
    expect(element.position).toBe('top');
    expect((element as any)._internals.states.has('bp-layer')).toBe(true);
  });

  it('should apply global styles', async () => {
    expect((element.constructor as typeof BpDialog).styles).toBeTruthy();
    expect((element.constructor as typeof BpDialog).styles.length).toBeGreaterThan(0);
  });
});

describe('bp-dialog - default open', () => {
  let fixture: HTMLElement;
  let element: BpDialog;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-dialog open>content</bp-dialog>`);
    element = fixture.querySelector<BpDialog>('bp-dialog');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should show dialog by default if "open" is set', async () => {
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);
  });
});
