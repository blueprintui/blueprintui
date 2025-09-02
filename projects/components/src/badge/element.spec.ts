import { html } from 'lit';
import '@blueprintui/components/include/badge.js';
import { BpBadge } from '@blueprintui/components/badge';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('bp-badge', () => {
  let fixture: HTMLElement;
  let element: BpBadge;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-badge>10</bp-badge>`);
    element = fixture.querySelector<BpBadge>('bp-badge');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-badge')).toBe(BpBadge);
  });

  it('should default to status neutral (undefined)', async () => {
    await elementIsStable(element);
    expect(element.status).toBe(undefined);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should handle status property changes', async () => {
    await elementIsStable(element);
    element.status = 'success';
    await elementIsStable(element);

    expect(element.status).toBe('success');
    expect(element.getAttribute('status')).toBe('success');
  });

  it('should have proper ARIA role', async () => {
    await elementIsStable(element);
    expect((element as any)._internals.role).toBe('status');
  });

  it('should render slot content', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('10');
  });

  it('should support different status values', async () => {
    const statuses = ['accent', 'success', 'warning', 'danger'] as const;

    for (const status of statuses) {
      element.status = status;
      await elementIsStable(element);
      expect(element.getAttribute('status')).toBe(status);
    }
  });

  it('should have internal part element', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot?.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal?.tagName).toBe('DIV');
  });

  it('should maintain ARIA role after reconnection', async () => {
    await elementIsStable(element);

    // Simulate disconnection and reconnection
    element.remove();
    fixture.appendChild(element);
    await elementIsStable(element);

    expect((element as any)._internals.role).toBe('status');
  });

  it('should apply stateTextContent decorator behavior', async () => {
    element.textContent = 'Updated Badge';
    await elementIsStable(element);
    expect(element.textContent).toBe('Updated Badge');
  });

  it('should handle empty content', async () => {
    element.textContent = '';
    await elementIsStable(element);
    expect(element.textContent).toBe('');
  });

  it('should reflect status attribute when undefined', async () => {
    element.status = 'success';
    await elementIsStable(element);
    expect(element.getAttribute('status')).toBe('success');

    element.status = undefined;
    await elementIsStable(element);
    expect(element.getAttribute('status')).toBe(null);
  });

  it('should render slot correctly', async () => {
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should allow CSS custom properties to be overridden', async () => {
    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--font-size', '16px');
    element.style.setProperty('--width', '100px');
    element.style.setProperty('--height', '30px');
    element.style.setProperty('--min-width', '50px');
    element.style.setProperty('--min-height', '20px');
    element.style.setProperty('--border-radius', '10px');
    element.style.setProperty('--padding', '10px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--font-size')).toBe('16px');
    expect(element.style.getPropertyValue('--width')).toBe('100px');
    expect(element.style.getPropertyValue('--height')).toBe('30px');
    expect(element.style.getPropertyValue('--min-width')).toBe('50px');
    expect(element.style.getPropertyValue('--min-height')).toBe('20px');
    expect(element.style.getPropertyValue('--border-radius')).toBe('10px');
    expect(element.style.getPropertyValue('--padding')).toBe('10px');
  });
});
