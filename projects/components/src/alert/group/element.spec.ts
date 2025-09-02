import { html } from 'lit';
import '@blueprintui/components/include/alert.js';
import { BpAlertGroup, BpAlert } from '@blueprintui/components/alert';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('alert group element', () => {
  let fixture: HTMLElement;
  let element: BpAlertGroup;
  let alerts: NodeListOf<BpAlert>;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <bp-alert-group>
        <bp-alert>alert 1</bp-alert>
        <bp-alert>alert 2</bp-alert>
      </bp-alert-group>`
    );

    element = fixture.querySelector<BpAlertGroup>('bp-alert-group');
    alerts = fixture.querySelectorAll<BpAlert>('bp-alert');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', () => {
    expect(customElements.get('bp-alert')).toBe(BpAlert);
    expect(customElements.get('bp-alert-group')).toBe(BpAlertGroup);
  });

  it('should set alert status properties when set by group', async () => {
    expect(element.status).toBe(undefined);
    expect(alerts[0].status).toBe(undefined);
    expect(alerts[1].status).toBe(undefined);

    element.status = 'accent';
    await element.updateComplete;
    expect(element.status).toBe('accent');
    expect(alerts[0].status).toBe('accent');
    expect(alerts[1].status).toBe('accent');

    element.status = 'success';
    await element.updateComplete;
    expect(element.status).toBe('success');
    expect(alerts[0].status).toBe('success');
    expect(alerts[1].status).toBe('success');

    element.status = 'warning';
    await element.updateComplete;
    expect(element.status).toBe('warning');
    expect(alerts[0].status).toBe('warning');
    expect(alerts[1].status).toBe('warning');

    element.status = 'danger';
    await element.updateComplete;
    expect(element.status).toBe('danger');
    expect(alerts[0].status).toBe('danger');
    expect(alerts[1].status).toBe('danger');
  });

  it('should reflect status property to attribute', async () => {
    expect(element.hasAttribute('status')).toBe(false);

    element.status = 'success';
    await element.updateComplete;
    expect(element.getAttribute('status')).toBe('success');

    element.status = 'warning';
    await element.updateComplete;
    expect(element.getAttribute('status')).toBe('warning');
  });

  it('should reflect type property to attribute', async () => {
    expect(element.hasAttribute('type')).toBe(false);

    element.type = 'banner';
    await element.updateComplete;
    expect(element.getAttribute('type')).toBe('banner');
  });

  it('should set _group attribute on child alerts', async () => {
    expect(alerts[0].hasAttribute('_group')).toBe(true);
    expect(alerts[1].hasAttribute('_group')).toBe(true);
  });

  it('should handle type property changes', async () => {
    expect(element.type).toBe(undefined);

    element.type = 'banner';
    await element.updateComplete;
    expect(element.type).toBe('banner');
    expect(element.getAttribute('type')).toBe('banner');
  });

  it('should render slot content', () => {
    const slot = element.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('should handle undefined status gracefully', async () => {
    element.status = 'success';
    await element.updateComplete;
    expect(alerts[0].status).toBe('success');

    element.status = undefined;
    await element.updateComplete;
    expect(alerts[0].status).toBe(undefined);
  });

  it('should handle dynamic alert additions', async () => {
    const newAlert = document.createElement('bp-alert') as BpAlert;
    newAlert.textContent = 'alert 3';
    element.appendChild(newAlert);

    // Trigger an update by changing a property to ensure the new alert gets processed
    element.status = 'success';
    await element.updateComplete;

    expect(newAlert.hasAttribute('_group')).toBe(true);
    expect(newAlert.status).toBe('success');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--padding', '20px');
    element.style.setProperty('--border-radius', '10px');

    await element.updateComplete;

    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--padding')).toBe('20px');
    expect(element.style.getPropertyValue('--border-radius')).toBe('10px');
  });
});
