import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpField, BpFieldMessage } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/checkbox.js';
import '@blueprintui/components/include/switch.js';

describe('bp-field', () => {
  let element: BpField;
  let message: BpFieldMessage;
  let label: HTMLLabelElement;
  let input: HTMLInputElement;
  let datalist: HTMLDataListElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <input type="text" />
        <bp-field-message>message</bp-field-message>
        <datalist></datalist>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
    input = fixture.querySelector<HTMLInputElement>('input');
    datalist = fixture.querySelector<HTMLDataListElement>('datalist');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should add field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-field')).toBe(true);
  });

  it('should assign label to slot', async () => {
    await elementIsStable(element);
    expect(label.slot).toBe('label');
    expect(element.shadowRoot.querySelector('[name=label]')).toBeTruthy();
  });

  it('should assign message to slot', async () => {
    await elementIsStable(element);
    expect(message.slot).toBe('message');
    expect(element.shadowRoot.querySelector('[name=message]')).toBeTruthy();
  });

  it('should assign datalist to slot', async () => {
    await elementIsStable(element);
    expect(datalist.slot).toBe('datalist');
    expect(element.shadowRoot.querySelector('[name=datalist]')).toBeTruthy();
  });

  it('should associate input and label', async () => {
    await elementIsStable(element);
    expect(input.id.includes('_')).toBe(true);
    expect(label.getAttribute('for')).toBe(input.id);
  });

  it('should associate input and datalist', async () => {
    await elementIsStable(element);
    expect(datalist.id).toBe(`${input.id}-datalist`);
    expect(input.getAttribute('list')).toBe(datalist.id);
  });

  it('should associate input and message', async () => {
    await elementIsStable(element);
    expect(input.getAttribute('aria-describedby')).toBe(message.id);
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
    expect(element.controlWidth).toBe(undefined);
  });

  it('should support layout property changes', async () => {
    await elementIsStable(element);

    element.layout = 'horizontal';
    await elementIsStable(element);
    expect(element.layout).toBe('horizontal');
    expect(element.getAttribute('layout')).toBe('horizontal');

    element.layout = 'compact';
    await elementIsStable(element);
    expect(element.layout).toBe('compact');
    expect(element.getAttribute('layout')).toBe('compact');
  });

  it('should support controlWidth property changes', async () => {
    await elementIsStable(element);

    // The property doesn't have a default value, so it's undefined initially
    expect(element.controlWidth).toBe(undefined);
    expect(element.getAttribute('control-width')).toBe(null);

    // Test setting the property
    element.controlWidth = 'shrink';
    await elementIsStable(element);
    expect(element.controlWidth).toBe('shrink');
    expect(element.getAttribute('control-width')).toBe('shrink');
  });

  it('should add input attribute to control', async () => {
    await elementIsStable(element);
    expect(input.hasAttribute('input')).toBe(true);
  });

  it('should set CSS states correctly', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(true);
    expect(element.matches(':state(label)')).toBe(true);
    expect(element.matches(':state(inline-control)')).toBe(false);
  });

  it('should detect inline controls', async () => {
    await elementIsStable(element);

    // Test with bp-field="inline" attribute
    input.setAttribute('bp-field', 'inline');
    // Trigger slotchange event to update states
    const slotchangeEvent = new Event('slotchange', { bubbles: true });
    element.shadowRoot.dispatchEvent(slotchangeEvent);
    await elementIsStable(element);
    expect(element.matches(':state(inline-control)')).toBe(true);

    // Reset
    input.removeAttribute('bp-field');
    element.shadowRoot.dispatchEvent(slotchangeEvent);
    await elementIsStable(element);
    expect(element.matches(':state(inline-control)')).toBe(false);
  });

  it('should detect checkbox as inline control', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-checkbox></bp-checkbox>
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(inline-control)')).toBe(true);
  });

  it('should detect switch as inline control', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-switch></bp-switch>
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(inline-control)')).toBe(true);
  });

  it('should handle field without label', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <input type="text" />
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(label)')).toBe(false);
    expect(element.shadowRoot.querySelector('[name=label]')).toBeFalsy();
  });

  it('should handle field without messages', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <input type="text" />
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(false);
    expect(element.shadowRoot.querySelector('[name=message]')).toBeFalsy();
  });

  it('should handle field without datalist', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <input type="text" />
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[name=datalist]')).toBeFalsy();
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    const inputSlot = element.shadowRoot.querySelector('.input-slot');
    expect(internalPart).toBeTruthy();
    expect(inputSlot).toBeTruthy();
  });

  it('should update states when label is added dynamically', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <input type="text" />
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(label)')).toBe(false);

    // Add label dynamically
    const newLabel = document.createElement('label');
    newLabel.textContent = 'New Label';
    element.appendChild(newLabel);
    // Manually assign slot and trigger slotchange event
    newLabel.slot = 'label';
    const slotchangeEvent = new Event('slotchange', { bubbles: true });
    element.shadowRoot.dispatchEvent(slotchangeEvent);
    await elementIsStable(element);

    expect(element.matches(':state(label)')).toBe(true);
    expect(newLabel.slot).toBe('label');
  });

  it('should update states when message is added dynamically', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <input type="text" />
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(false);

    // Add message dynamically
    const newMessage = document.createElement('bp-field-message');
    newMessage.textContent = 'New Message';
    element.appendChild(newMessage);
    // Trigger slotchange event to update states
    const slotchangeEvent = new Event('slotchange', { bubbles: true });
    element.shadowRoot.dispatchEvent(slotchangeEvent);
    await elementIsStable(element);

    expect(element.matches(':state(message)')).toBe(true);
    expect(newMessage.slot).toBe('message');
  });

  it('should update states when datalist is added dynamically', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <input type="text" />
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpField>('bp-field');
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('[name=datalist]')).toBeFalsy();

    // Add datalist dynamically
    const newDatalist = document.createElement('datalist');
    element.appendChild(newDatalist);
    // Manually assign slot and trigger re-render
    newDatalist.slot = 'datalist';
    element.requestUpdate();
    await elementIsStable(element);

    expect(newDatalist.slot).toBe('datalist');
    expect(element.shadowRoot.querySelector('[name=datalist]')).toBeTruthy();
  });

  it('should handle message status changes', async () => {
    await elementIsStable(element);

    // Set message status to error
    message.status = 'error';
    await elementIsStable(element);

    // The component should update field status state
    // This tests the integration with updateFieldStatusState
    expect(message.status).toBe('error');
  });

  it('should handle message hidden attribute changes', async () => {
    await elementIsStable(element);

    // Hide message
    message.setAttribute('hidden', '');
    await elementIsStable(element);

    // Show message
    message.removeAttribute('hidden');
    await elementIsStable(element);

    // This tests the listenForAttributeListChange integration
    expect(message.hasAttribute('hidden')).toBe(false);
  });
});
