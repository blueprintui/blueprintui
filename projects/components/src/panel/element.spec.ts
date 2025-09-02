import { html } from 'lit';
import '@blueprintui/components/include/panel.js';
import { BpPanel } from '@blueprintui/components/panel';
import { elementIsStable, createFixture, removeFixture, emulateClick, onceEvent } from '@blueprintui/test';

describe('bp-panel', () => {
  let fixture: HTMLElement;
  let element: BpPanel;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-panel></bp-panel>`);
    element = fixture.querySelector<BpPanel>('bp-panel');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-panel')).toBe(BpPanel);
  });

  it('should default to size medium (undefined)', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(undefined);
    expect(element.getAttribute('size')).toBe(null);
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.closable).toBe(false);
    expect(element.hidden).toBe(false);
    expect(element.i18n).toBeDefined();
  });

  it('should support size property', async () => {
    await elementIsStable(element);

    element.size = 'sm';
    await elementIsStable(element);
    expect(element.size).toBe('sm');
    expect(element.getAttribute('size')).toBe('sm');

    element.size = 'lg';
    await elementIsStable(element);
    expect(element.size).toBe('lg');
    expect(element.getAttribute('size')).toBe('lg');
  });

  it('should support closable property', async () => {
    await elementIsStable(element);

    element.closable = true;
    await elementIsStable(element);
    expect(element.closable).toBe(true);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeTruthy();
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('flat');
    expect(closeButton.getAttribute('type')).toBe('button');
  });

  it('should support hidden property', async () => {
    await elementIsStable(element);

    element.hidden = true;
    await elementIsStable(element);
    expect(element.hidden).toBe(true);
    expect(element.getAttribute('hidden')).toBe('');

    element.hidden = false;
    await elementIsStable(element);
    expect(element.hidden).toBe(false);
    expect(element.getAttribute('hidden')).toBe(null);
  });

  it('should support i18n property', async () => {
    await elementIsStable(element);

    const customI18n = { ...element.i18n, close: 'Custom Close' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.close).toBe('Custom Close');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    expect(element._internals.role).toBe('region');
    expect(element._internals.states.has('bp-layer')).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should render slots correctly', async () => {
    fixture = await createFixture(html`
      <bp-panel>
        <div slot="header">Header Content</div>
        <div>Default Content</div>
        <div slot="footer">Footer Content</div>
      </bp-panel>
    `);
    element = fixture.querySelector<BpPanel>('bp-panel');
    await elementIsStable(element);

    const headerSlot = element.shadowRoot.querySelector('slot[name="header"]');
    const defaultSlot = element.shadowRoot.querySelector('slot:not([name])');
    const footerSlot = element.shadowRoot.querySelector('slot[name="footer"]');

    expect(headerSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
    expect(footerSlot).toBeTruthy();
  });

  it('should handle close button click when closable', async () => {
    element.closable = true;
    await elementIsStable(element);

    const closeSpy = jasmine.createSpy('close');
    element.addEventListener('close', closeSpy);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    await emulateClick(closeButton);

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not render close button when not closable', async () => {
    await elementIsStable(element);

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton).toBeFalsy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--border', '1px solid black');
    element.style.setProperty('--padding', '1rem');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid black');
    expect(element.style.getPropertyValue('--padding')).toBe('1rem');
  });

  it('should have typeClosableController available', async () => {
    await elementIsStable(element);
    expect((element as any).typeClosableController).toBeDefined();
  });

  it('should support typeClosable commands', async () => {
    await elementIsStable(element);

    const closeEvent = onceEvent(element, 'close');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--close';
    element.dispatchEvent(commandEvent);
    expect(await closeEvent).toBeTruthy();
  });

  it('should support typeClosable toggle command', async () => {
    element.hidden = true;
    await elementIsStable(element);

    const openEvent = onceEvent(element, 'open');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--toggle';
    element.dispatchEvent(commandEvent);
    expect(await openEvent).toBeTruthy();
  });

  it('should support typeClosable open command', async () => {
    element.hidden = true;
    await elementIsStable(element);

    const openEvent = onceEvent(element, 'open');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--open';
    element.dispatchEvent(commandEvent);
    expect(await openEvent).toBeTruthy();
  });

  it('should have correct CSS states based on hidden property', async () => {
    await elementIsStable(element);

    // Initially visible (open state)
    expect(element._internals.states.has('open')).toBe(true);
    expect(element._internals.states.has('close')).toBe(false);
    expect(element._internals.ariaHidden).toBe('false');

    // Set to hidden (close state)
    element.hidden = true;
    await elementIsStable(element);
    expect(element._internals.states.has('open')).toBe(false);
    expect(element._internals.states.has('close')).toBe(true);
    expect(element._internals.ariaHidden).toBe('true');

    // Set back to visible (open state)
    element.hidden = false;
    await elementIsStable(element);
    expect(element._internals.states.has('open')).toBe(true);
    expect(element._internals.states.has('close')).toBe(false);
    expect(element._internals.ariaHidden).toBe('false');
  });
});
