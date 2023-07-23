import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpField, BpFieldMessage, updateFieldStatusState } from '@blueprintui/components/forms';
import { BpInput } from '@blueprintui/components/input';
import '@blueprintui/components/include/input.js';
import '@blueprintui/components/include/forms.js';

describe('syncHTML5Validation', () => {
  let fixture: HTMLElement;
  let control: BpInput;
  let fieldMessage: BpFieldMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input required></bp-input>
        <bp-field-message error="valueMissing">required</bp-field-message>
      </bp-field>
    `);

    control = fixture.querySelector<BpInput>('bp-input');
    fieldMessage = fixture.querySelector<BpFieldMessage>('bp-field-message');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('show or hide validation message on blur', async () => {
    const input = control.shadowRoot.querySelector('input');
    await elementIsStable(control);
    expect(fieldMessage.hasAttribute('hidden')).toBe(true);

    input.dispatchEvent(new Event('blur', { bubbles: true }));
    expect(fieldMessage.hasAttribute('hidden')).toBe(true);

    input.dispatchEvent(new Event('blur', { bubbles: true }));
    expect(fieldMessage.hasAttribute('hidden')).toBe(true);

    control.value = 'test';
    control.dispatchEvent(new Event('input'));
    expect(fieldMessage.hasAttribute('hidden')).toBe(true);
  });
});

describe('updateFieldStatusState', () => {
  let fixture: HTMLElement;
  let field: BpField;
  let control: BpInput;
  let message: BpFieldMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input required></bp-input>
        <bp-field-message>required</bp-field-message>
      </bp-field>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await field.updateComplete;
    await control.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize default status for field', async () => {
    await elementIsStable(field);
    await elementIsStable(control);
    expect(field.matches(':--success')).toBe(false);
    expect(field.matches(':--error')).toBe(false);
    expect(control.matches(':--success')).toBe(false);
    expect(control.matches(':--error')).toBe(false);
  });

  it('should initialize success status for field', async () => {
    message.status = 'success';
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    await elementIsStable(control);
    expect(field.matches(':--success')).toBe(true);
    expect(field.matches(':--error')).toBe(false);
    expect(control.matches(':--success')).toBe(true);
    expect(control.matches(':--error')).toBe(false);
  });

  it('should initialize success error for field', async () => {
    message.status = 'error';
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    expect(field.matches(':--success')).toBe(false);
    expect(field.matches(':--error')).toBe(true);
    expect(control.matches(':--success')).toBe(false);
    expect(control.matches(':--error')).toBe(true);
  });
});
