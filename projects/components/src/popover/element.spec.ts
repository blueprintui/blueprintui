import { html } from 'lit';
import '@blueprintui/components/include/popover.js';
import { BpPopover } from '@blueprintui/components/popover';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

describe('bp-popover', () => {
  let fixture: HTMLElement;
  let element: BpPopover;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-popover>content</bp-popover>`);
    element = fixture.querySelector<BpPopover>('bp-popover');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-popover')).toBe(BpPopover);
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

  // Position property tests
  it('should support position property changes', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('bottom');
    expect(element.getAttribute('position')).toBe('bottom');

    element.position = 'top';
    await elementIsStable(element);
    expect(element.position).toBe('top');
    expect(element.getAttribute('position')).toBe('top');

    element.position = 'left';
    await elementIsStable(element);
    expect(element.position).toBe('left');
    expect(element.getAttribute('position')).toBe('left');

    element.position = 'right';
    await elementIsStable(element);
    expect(element.position).toBe('right');
    expect(element.getAttribute('position')).toBe('right');
  });

  // Anchor property tests
  it('should support anchor property', async () => {
    await elementIsStable(element);
    expect(element.anchor).toBeUndefined();

    const anchorElement = document.createElement('button');
    element.anchor = anchorElement;
    await elementIsStable(element);
    expect(element.anchor).toBe(anchorElement);

    element.anchor = 'button';
    await elementIsStable(element);
    expect(element.anchor).toBe('button');
  });

  // Modal property tests
  it('should default modal to false', async () => {
    await elementIsStable(element);
    expect(element.modal).toBe(false);
  });

  it('should support modal property changes', async () => {
    await elementIsStable(element);
    expect(element.modal).toBe(false);

    element.modal = true;
    await elementIsStable(element);
    expect(element.modal).toBe(true);

    element.modal = false;
    await elementIsStable(element);
    expect(element.modal).toBe(false);
  });

  // FocusTrap property tests
  it('should default focusTrap to false', async () => {
    await elementIsStable(element);
    expect(element.focusTrap).toBe(false);
  });

  it('should support focusTrap property changes', async () => {
    await elementIsStable(element);
    expect(element.focusTrap).toBe(false);

    element.focusTrap = true;
    await elementIsStable(element);
    expect(element.focusTrap).toBe(true);

    element.focusTrap = false;
    await elementIsStable(element);
    expect(element.focusTrap).toBe(false);
  });

  // Arrow property tests
  it('should default arrow to undefined', async () => {
    await elementIsStable(element);
    expect(element.arrow).toBeUndefined();
  });

  it('should render arrow when arrow is true', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part="arrow"]')).toBeNull();

    element.arrow = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part="arrow"]')).toBeTruthy();

    element.arrow = false;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[part="arrow"]')).toBeNull();
  });

  // I18n property tests
  it('should have default i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(element.i18n.close).toBeDefined();
  });

  it('should support custom i18n property', async () => {
    await elementIsStable(element);
    const customI18n = { ...element.i18n, close: 'Custom Close' };

    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.close).toBe('Custom Close');
  });

  // CSS parts tests
  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  // Slots tests
  it('should render default slot content', async () => {
    await elementIsStable(element);
    const content = element.shadowRoot.querySelector('.content');
    expect(content).toBeTruthy();
    expect(element.textContent?.trim()).toBe('content');
  });

  it('should render header slot when provided', async () => {
    fixture = await createFixture(html`
      <bp-popover>
        <div slot="header">Header Content</div>
        Default Content
      </bp-popover>
    `);
    element = fixture.querySelector<BpPopover>('bp-popover');
    await elementIsStable(element);

    const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
    expect(headerSlot).toBeTruthy();
  });

  it('should render footer slot when provided', async () => {
    fixture = await createFixture(html`
      <bp-popover>
        Default Content
        <div slot="footer">Footer Content</div>
      </bp-popover>
    `);
    element = fixture.querySelector<BpPopover>('bp-popover');
    await elementIsStable(element);

    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');
    expect(footerSlot).toBeTruthy();
  });

  // Close button accessibility tests
  it('should have proper accessibility attributes on close button', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('aria-label')).toBe(element.i18n.close);
    expect(closeButton.getAttribute('type')).toBe('button');
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('flat');
  });

  // CSS custom properties tests
  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--height', '100px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--height')).toBe('100px');
  });
});
