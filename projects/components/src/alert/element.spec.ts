import { html } from 'lit';
import '@blueprintui/components/include/alert.js';
import { BpAlert } from '@blueprintui/components/alert';
import { elementIsStable, createFixture, emulateClick, onceEvent, removeFixture } from '@blueprintui/test';
import { assignedElements } from '@blueprintui/components/internals';

describe('alert element', () => {
  let fixture: HTMLElement;
  let element: BpAlert;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-alert>hello there</bp-alert>`);
    element = fixture.querySelector<BpAlert>('bp-alert');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', () => {
    expect(customElements.get('bp-alert')).toBe(BpAlert);
  });

  it('should default to status neutral (undefined)', () => {
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should show close button if closable', async () => {
    expect(element.closable).toBe(false);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBe(null);

    element.closable = true;
    await element.updateComplete;

    expect(element.closable).toBe(true);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
  });

  it('should dispatch a "close" event when the close button is clicked', async () => {
    element.closable = true;
    await elementIsStable(element);

    const event = onceEvent(element, 'close');
    emulateClick(element.shadowRoot.querySelector<HTMLElement>('bp-button-icon'));
    expect(await event).toBeTruthy();
  });

  it('should provide default status icon', () => {
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('info');
  });

  it('should provide info accent icon when status is info', async () => {
    element.status = 'accent';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('info');
  });

  it('should provide success status icon when status is success', async () => {
    element.status = 'success';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('success');
  });

  it('should provide warning status icon when status is warning', async () => {
    element.status = 'warning';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('warning');
  });

  it('should provide danger status icon when status is danger', async () => {
    element.status = 'danger';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('error');
  });

  it('should reflect status attribute when status property changes', async () => {
    element.status = 'success';
    await element.updateComplete;
    expect(element.getAttribute('status')).toBe('success');

    element.status = 'warning';
    await element.updateComplete;
    expect(element.getAttribute('status')).toBe('warning');
  });

  it('should default hidden property to false', () => {
    expect(element.hidden).toBe(false);
    expect(element.getAttribute('hidden')).toBe(null);
  });

  it('should reflect hidden attribute when hidden property changes', async () => {
    element.hidden = true;
    await element.updateComplete;
    expect(element.getAttribute('hidden')).toBe('');

    element.hidden = false;
    await element.updateComplete;
    expect(element.getAttribute('hidden')).toBe(null);
  });

  it('should have default i18n object', () => {
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n).toBe('object');
  });

  it('should allow custom i18n object', async () => {
    const customI18n = { ...element.i18n, close: 'Custom Close' };
    element.i18n = customI18n;
    element.closable = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('aria-label')).toBe('Custom Close');
  });

  it('should use icon slot when provided', async () => {
    fixture = await createFixture(html`
      <bp-alert>
        <bp-icon slot="icon" shape="custom" size="sm"></bp-icon>
        content
      </bp-alert>
    `);
    element = fixture.querySelector<BpAlert>('bp-alert');
    await elementIsStable(element);

    const slottedElements = assignedElements<HTMLElement>(element, { name: 'icon' });
    expect(slottedElements.length).toBe(1);
    expect(slottedElements[0].getAttribute('shape')).toBe('custom');
  });

  it('should fallback to default icon when no icon slot is provided', () => {
    const slottedElements = assignedElements<HTMLElement>(element, { name: 'icon' });
    expect(slottedElements.length).toBe(0);

    const fallbackIcon = element.shadowRoot.querySelector('bp-icon');
    expect(fallbackIcon).toBeTruthy();
    expect(fallbackIcon.shape).toBe('info');
  });

  it('should have proper close button attributes when closable', async () => {
    element.closable = true;
    await element.updateComplete;

    const closeButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(closeButton.getAttribute('shape')).toBe('close');
    expect(closeButton.getAttribute('action')).toBe('flat');
    expect(closeButton.getAttribute('part')).toBe('close');
    expect(closeButton.hasAttribute('aria-label')).toBe(true);
  });

  it('should support typeClosable commands', async () => {
    const closeEvent = onceEvent(element, 'close');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--close';
    element.dispatchEvent(commandEvent);
    expect(await closeEvent).toBeTruthy();
  });

  it('should support typeClosable toggle command', async () => {
    element.hidden = true;
    await element.updateComplete;

    const openEvent = onceEvent(element, 'open');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--toggle';
    element.dispatchEvent(commandEvent);
    expect(await openEvent).toBeTruthy();
  });

  it('should support typeClosable open command', async () => {
    element.hidden = true;
    await element.updateComplete;

    const openEvent = onceEvent(element, 'open');
    const commandEvent = new Event('command') as any;
    commandEvent.command = '--open';
    element.dispatchEvent(commandEvent);
    expect(await openEvent).toBeTruthy();
  });

  it('should handle invalid status values gracefully', async () => {
    element.status = 'invalid-status' as any;
    await element.updateComplete;
    // Invalid status values will result in undefined icon shape
    const icon = element.shadowRoot.querySelector('bp-icon');
    expect(icon.shape).toBe(undefined);
  });
});
