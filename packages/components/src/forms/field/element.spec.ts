import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/components/test';
import { BpField, BpFieldMessage } from '@blueprintui/components/forms';
import '@blueprintui/components/include/forms.js';

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
});
