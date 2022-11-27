
import { html } from 'lit';
import '@blueprintui/components/include/alert.js';
import { BpAlert } from '@blueprintui/components/alert';
import { elementIsStable, createFixture, emulateClick, onceEvent, removeFixture } from '@blueprintui/components/test';

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
    expect((await event)).toBeTruthy();
  });

  it('should provide default status icon', () => {
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('info-circle');
  });

  it('should provide info accent icon when status is info', async () => {
    element.status = 'accent';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('info-circle');
  });

  it('should provide success status icon when status is success', async () => {
    element.status = 'success';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('check-circle');
  });

  it('should provide warning status icon when status is warning', async () => {
    element.status = 'warning';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('warning');
  });

  it('should provide danger status icon when status is danger', async () => {
    element.status = 'danger';
    await element.updateComplete;
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('exclamation-circle');
  });
});
