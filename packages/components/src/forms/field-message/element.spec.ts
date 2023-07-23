import { html } from 'lit';
import '@blueprintui/components/include/forms.js';
import { BpFieldMessage } from '@blueprintui/components/forms';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import type { BpIcon } from '@blueprintui/icons';

describe('bp-field-message element', () => {
  let fixture: HTMLElement;
  let element: BpFieldMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-field-message>message</bp-field-message>`);
    element = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(element.innerText).toBe('message');
  });

  it('should auto set the host slot', () => {
    expect(element.getAttribute('slot')).toBe('message');
  });

  it('should render status icon', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon')).toBe(null);

    element.status = 'error';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('error');

    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('success');
  });

  it('should get error status icon', async () => {
    element.status = 'error';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]').shape).toBe('error');
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]')).toBe(null);
  });

  it('should get success status icon', async () => {
    element.status = 'success';
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=danger]')).toBe(null);
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]')).toBeTruthy();
    expect(element.shadowRoot.querySelector<BpIcon>('bp-icon[status=success]').shape).toBe('success');
  });
});
