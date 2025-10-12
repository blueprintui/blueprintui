import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpFieldMessage, BpFieldset } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';
import '@blueprintui/components/include/radio.js';

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

describe('bp-fieldset with bp-radio elements', () => {
  let fixture: HTMLElement;
  let element: BpFieldset;
  let radios: NodeListOf<any>;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-fieldset>
        <label>radio group</label>

        <label>option 1</label>
        <bp-radio value="1" checked></bp-radio>

        <label>option 2</label>
        <bp-radio value="2"></bp-radio>

        <label>option 3</label>
        <bp-radio value="3"></bp-radio>
      </bp-fieldset>
    `);

    element = fixture.querySelector<BpFieldset>('bp-fieldset');
    radios = fixture.querySelectorAll('bp-radio');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should auto-assign name attribute to bp-radio elements without explicit names', async () => {
    await elementIsStable(element);

    // All radios should have the same generated name
    expect(radios[0].name).toBeTruthy();
    expect(radios[0].name.includes('_')).toBe(true);
    expect(radios[0].name).toBe(radios[1].name);
    expect(radios[0].name).toBe(radios[2].name);
  });

  it('should set name attribute (not just property) on bp-radio elements', async () => {
    await elementIsStable(element);

    // Verify the attribute is actually set, not just the property
    expect(radios[0].getAttribute('name')).toBeTruthy();
    expect(radios[0].getAttribute('name')).toBe(radios[1].getAttribute('name'));
    expect(radios[0].getAttribute('name')).toBe(radios[2].getAttribute('name'));

    // Property and attribute should match
    expect(radios[0].name).toBe(radios[0].getAttribute('name'));
  });

  it('should allow only one bp-radio to be checked at a time', async () => {
    await elementIsStable(element);

    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBeFalsy();
    expect(radios[2].checked).toBeFalsy();

    radios[1].click();
    await elementIsStable(element);

    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
    expect(radios[2].checked).toBe(false);
  });

  it('should not override explicit name attributes on bp-radio elements', async () => {
    const fixtureWithNames = await createFixture(html`
      <bp-fieldset>
        <label>radio group</label>

        <label>option 1</label>
        <bp-radio name="explicit-name" value="1"></bp-radio>

        <label>option 2</label>
        <bp-radio name="explicit-name" value="2"></bp-radio>
      </bp-fieldset>
    `);

    const fieldset = fixtureWithNames.querySelector<BpFieldset>('bp-fieldset');
    const radiosWithNames = fixtureWithNames.querySelectorAll('bp-radio');

    await elementIsStable(fieldset);

    expect(radiosWithNames[0].name).toBe('explicit-name');
    expect(radiosWithNames[1].name).toBe('explicit-name');
    expect(radiosWithNames[0].getAttribute('name')).toBe('explicit-name');

    removeFixture(fixtureWithNames);
  });

  it('should assign different names to bp-radios in different fieldsets', async () => {
    const multiFieldsetFixture = await createFixture(html`
      <div>
        <bp-fieldset>
          <label>group 1</label>
          <label>option 1</label>
          <bp-radio value="1a"></bp-radio>
          <label>option 2</label>
          <bp-radio value="1b"></bp-radio>
        </bp-fieldset>

        <bp-fieldset>
          <label>group 2</label>
          <label>option 1</label>
          <bp-radio value="2a"></bp-radio>
          <label>option 2</label>
          <bp-radio value="2b"></bp-radio>
        </bp-fieldset>
      </div>
    `);

    const fieldsets = multiFieldsetFixture.querySelectorAll('bp-fieldset');
    await Promise.all([elementIsStable(fieldsets[0]), elementIsStable(fieldsets[1])]);

    const group1Radios = fieldsets[0].querySelectorAll('bp-radio');
    const group2Radios = fieldsets[1].querySelectorAll('bp-radio');

    // Radios within same fieldset should have same name
    expect(group1Radios[0].name).toBe(group1Radios[1].name);
    expect(group2Radios[0].name).toBe(group2Radios[1].name);

    // Radios in different fieldsets should have different names
    expect(group1Radios[0].name).not.toBe(group2Radios[0].name);

    removeFixture(multiFieldsetFixture);
  });

  it('should auto-assign name to radios without explicit names in associated groups', async () => {
    const mixedFixture = await createFixture(html`
      <bp-fieldset>
        <label>radio group</label>

        <label>option 1</label>
        <bp-radio name="mixed-group" value="1" checked></bp-radio>

        <label>option 2</label>
        <bp-radio name="mixed-group" value="2"></bp-radio>

        <label>option 3</label>
        <bp-radio value="3"></bp-radio>
      </bp-fieldset>
    `);

    const fieldset = mixedFixture.querySelector<BpFieldset>('bp-fieldset');
    const mixedRadios = mixedFixture.querySelectorAll('bp-radio');

    await elementIsStable(fieldset);

    // First two have explicit name and keep it
    expect(mixedRadios[0].name).toBe('mixed-group');
    expect(mixedRadios[1].name).toBe('mixed-group');

    // Third one gets auto-assigned the same generated name
    // because it has no name and the group is associated
    expect(mixedRadios[2].name).toBeTruthy();
    expect(mixedRadios[2].name.includes('_')).toBe(true);
    expect(mixedRadios[2].getAttribute('name')).toBeTruthy();

    removeFixture(mixedFixture);
  });
});
