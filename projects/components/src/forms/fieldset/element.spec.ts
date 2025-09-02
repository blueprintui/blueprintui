import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpFieldMessage, BpFieldset } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';

describe('bp-fieldset', () => {
  let element: BpFieldset;
  let message: BpFieldMessage;
  let labels: NodeListOf<HTMLLabelElement>;
  let inputs: NodeListOf<HTMLInputElement>;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-fieldset>
        <label>fieldset</label>

        <label>radio one</label>
        <input type="radio" value="one" checked />

        <label>radio two</label>
        <input type="radio" value="two" />
        <bp-field-message>message</bp-field-message>
      </bp-fieldset>
    `);

    element = fixture.querySelector<BpFieldset>('bp-fieldset');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    labels = fixture.querySelectorAll<HTMLLabelElement>('label');
    inputs = fixture.querySelectorAll<HTMLInputElement>('input');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should set default layout property', async () => {
    await elementIsStable(element);
    expect(element.layout).toBe('vertical');
  });

  it('should reflect layout property to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('layout')).toBe('vertical');

    element.layout = 'horizontal';
    await elementIsStable(element);
    expect(element.getAttribute('layout')).toBe('horizontal');
  });

  it('should add fieldset marker attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-fieldset')).toBe(true);
  });

  it('should assign group label to slot', async () => {
    await elementIsStable(element);
    expect(labels[0].slot).toBe('label');
    expect(element.shadowRoot.querySelector('[name=label]')).toBeTruthy();
  });

  it('should assign message to slot', async () => {
    await elementIsStable(element);
    expect(message.slot).toBe('message');
    expect(element.shadowRoot.querySelector('[name=message]')).toBeTruthy();
  });

  it('should set fieldset to role radiogroup', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('radiogroup');
  });

  it('should label group by label via aria-labelledby', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('aria-labelledby')).toBe(labels[0].id);
  });

  it('should describe group by message via aria-describedby', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('aria-describedby')).toBe(message.id);
  });

  it('should associate labels and radio inputs', async () => {
    await elementIsStable(element);
    expect(labels[1].htmlFor).toBe(inputs[0].id);
    expect(labels[2].htmlFor).toBe(inputs[1].id);
  });

  it('should assign each input/label pair to a individual slot', async () => {
    await elementIsStable(element);
    expect(labels[1].slot).toBe(inputs[0].slot);
    expect(labels[2].slot).toBe(inputs[1].slot);

    expect(labels[1].slot.includes('input-')).toBe(true);
    expect(labels[2].slot.includes('input-')).toBe(true);
    expect(inputs[0].slot.includes('input-')).toBe(true);
    expect(inputs[1].slot.includes('input-')).toBe(true);
  });

  it('should assign a name to all inputs', async () => {
    await elementIsStable(element);
    expect(inputs[0].name.includes('_')).toBe(true);
    expect(inputs[0].name).toBe(inputs[1].name);
  });

  it('should click the next item in associated control list when using arrow keys', async () => {
    await elementIsStable(element);
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);

    inputs[0].focus();
    inputs[0].dispatchEvent(new CustomEvent('bp-keychange', { detail: { activeItem: inputs[1] }, bubbles: true }));
    await elementIsStable(element);
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internal = element.shadowRoot.querySelector('[part="internal"]');
    const inputSlotGroup = element.shadowRoot.querySelector('.input-slot-group');

    expect(internal).toBeTruthy();
    expect(inputSlotGroup).toBeTruthy();
  });

  it('should add message CSS state when field message is present', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(true);
  });

  it('should remove message CSS state when field message is removed', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(true);

    message.remove();
    // Need to trigger slotchange to update states
    element.dispatchEvent(new Event('slotchange', { bubbles: true }));
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(false);
  });

  it('should handle slotchange events to update states', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(true);

    // Simulate slotchange event
    element.dispatchEvent(new Event('slotchange', { bubbles: true }));
    await elementIsStable(element);
    expect(element.matches(':state(message)')).toBe(true);
  });

  it('should not click items when not an associated group', async () => {
    await elementIsStable(element);
    // Remove radio inputs to make it not an associated group
    inputs.forEach(input => input.remove());

    const textInput = document.createElement('input');
    textInput.type = 'text';
    element.appendChild(textInput);
    await elementIsStable(element);

    const clickSpy = jasmine.createSpy('click');
    textInput.addEventListener('click', clickSpy);

    textInput.dispatchEvent(new CustomEvent('bp-keychange', { detail: { activeItem: textInput }, bubbles: true }));
    await elementIsStable(element);

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should generate unique ID for label if not present', async () => {
    await elementIsStable(element);
    expect(labels[0].id).toBeTruthy();
    expect(labels[0].id.length).toBeGreaterThan(0);
  });
});
