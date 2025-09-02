import { html } from 'lit';
import '@blueprintui/components/include/tooltip.js';
import { BpTooltip } from '@blueprintui/components/tooltip';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';

describe('bp-tooltip', () => {
  let fixture: HTMLElement;
  let element: BpTooltip;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-tooltip>content</bp-tooltip>`);
    element = fixture.querySelector<BpTooltip>('bp-tooltip');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-tooltip')).toBe(BpTooltip);
  });

  it('should have a popover type of hint', async () => {
    await elementIsStable(element);
    expect(element.popover).toBe('hint');
  });

  it('should default to closable to false (undefined)', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeNull();
  });

  it('should default to position top', async () => {
    await elementIsStable(element);
    expect(element.position).toBe('top');
  });

  it('should render close button when closable', async () => {
    element.closable = true;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should default role tooltip', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('tooltip');
  });

  it('should dispatch a "toggle" event when the close button is clicked', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const event = onceEvent(element, 'toggle');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('should support inherited anchor property', async () => {
    await elementIsStable(element);
    expect(element.anchor).toBeUndefined();

    element.anchor = 'test-anchor';
    await elementIsStable(element);
    expect(element.anchor).toBe('test-anchor');
  });

  it('should support anchor property with HTMLElement', async () => {
    await elementIsStable(element);
    expect(element.anchor).toBeUndefined();

    const anchorElement = document.createElement('button');
    element.anchor = anchorElement;
    await elementIsStable(element);
    expect(element.anchor).toBe(anchorElement);
  });

  it('should have default i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n).toBe('object');
  });

  it('should support custom i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(element.i18n.close).toBeDefined();

    const customI18n = { ...element.i18n, close: 'Custom Close' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.close).toBe('Custom Close');
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    const arrowPart = element.shadowRoot.querySelector('[part="arrow"]');

    expect(internalPart).toBeTruthy();
    expect(arrowPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--padding', '1rem');
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--height', '100px');
    element.style.setProperty('--min-width', '150px');
    element.style.setProperty('--min-height', '50px');
    element.style.setProperty('--font-size', '16px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--height')).toBe('100px');
    expect(element.style.getPropertyValue('--min-width')).toBe('150px');
    expect(element.style.getPropertyValue('--min-height')).toBe('50px');
    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
  });

  it('should dispatch open and close events', async () => {
    await elementIsStable(element);

    const openEvent = onceEvent(element, 'open');
    const closeEvent = onceEvent(element, 'close');

    element.showPopover();
    expect(await openEvent).toBeTruthy();

    element.hidePopover();
    expect(await closeEvent).toBeTruthy();
  });

  it('should support different position values', async () => {
    await elementIsStable(element);

    const positions = ['top', 'bottom', 'left', 'right'] as const;

    for (const position of positions) {
      element.position = position;
      await elementIsStable(element);
      expect(element.position).toBe(position);
      expect(element.getAttribute('position')).toBe(position);
    }
  });

  it('should reflect open property to attribute', async () => {
    await elementIsStable(element);
    expect(element.open).toBe(false);
    expect(element.hasAttribute('open')).toBe(false);

    element.open = true;
    await elementIsStable(element);
    expect(element.open).toBe(true);
    expect(element.hasAttribute('open')).toBe(true);

    element.open = false;
    await elementIsStable(element);
    expect(element.open).toBe(false);
    expect(element.hasAttribute('open')).toBe(false);
  });

  it('should render slot content correctly', async () => {
    await elementIsStable(element);
    const content = element.shadowRoot.querySelector('.content');
    expect(content).toBeTruthy();

    // Test that slot is present
    const slot = content.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should have internal element with correct id', async () => {
    await elementIsStable(element);
    const internalElement = element.shadowRoot.querySelector('#internal');
    expect(internalElement).toBeTruthy();
    expect(internalElement.getAttribute('part')).toBe('internal');
  });

  it('should have proper accessibility attributes on close button', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('aria-label')).toBe(element.i18n.close);
    expect(closeButton.getAttribute('type')).toBe('button');
  });

  it('should support popover methods', async () => {
    await elementIsStable(element);

    // Test showPopover
    element.showPopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    // Test hidePopover
    element.hidePopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(false);

    // Test togglePopover
    element.togglePopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(true);

    element.togglePopover();
    await elementIsStable(element);
    expect(element.matches(':popover-open')).toBe(false);
  });

  it('should handle close button click correctly', async () => {
    element.closable = true;
    element.showPopover();
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector<HTMLElement>('bp-button-icon');
    expect(closeButton).toBeTruthy();

    const closeEvent = onceEvent(element, 'close');
    emulateClick(closeButton);
    expect(await closeEvent).toBeTruthy();
  });
});
