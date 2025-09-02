import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpField, BpFieldMessage, updateFieldStatusState, formLayouts } from '@blueprintui/components/forms';
import { BpInput } from '@blueprintui/components/input';
import '@blueprintui/components/include/input.js';
import '@blueprintui/components/include/forms.js';

describe('formLayouts', () => {
  it('should export all expected form layout options', () => {
    expect(formLayouts).toEqual(['vertical', 'vertical-inline', 'horizontal', 'horizontal-inline', 'compact']);
  });
});

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

describe('syncValidationMessages', () => {
  let fixture: HTMLElement;
  let field: BpField;
  let control: BpInput;
  let message1: BpFieldMessage;
  let message2: BpFieldMessage;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input required></bp-input>
        <bp-field-message error="valueMissing">required</bp-field-message>
        <bp-field-message error="typeMismatch">invalid type</bp-field-message>
      </bp-field>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    message1 = fixture.querySelectorAll<BpFieldMessage>('bp-field-message')[0];
    message2 = fixture.querySelectorAll<BpFieldMessage>('bp-field-message')[1];
    await field.updateComplete;
    await control.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should initialize error messages as hidden and set status to error', async () => {
    await elementIsStable(field);

    expect(message1.hasAttribute('hidden')).toBe(true);
    expect(message1.status).toBe('error');
    expect(message2.hasAttribute('hidden')).toBe(true);
    expect(message2.status).toBe('error');
  });

  it('should handle validation message visibility', async () => {
    await elementIsStable(field);

    // Initially messages should be hidden
    expect(message1.hasAttribute('hidden')).toBe(true);
    expect(message2.hasAttribute('hidden')).toBe(true);

    // Test that the validation system is set up by checking message properties
    expect(message1.error).toBe('valueMissing');
    expect(message2.error).toBe('typeMismatch');
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
    expect(field.matches(':state(success)')).toBe(false);
    expect(field.matches(':state(error)')).toBe(false);
    expect(control.matches(':state(success)')).toBe(false);
    expect(control.matches(':state(error)')).toBe(false);
  });

  it('should initialize success status for field', async () => {
    message.status = 'success';
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    await elementIsStable(control);
    expect(field.matches(':state(success)')).toBe(true);
    expect(field.matches(':state(error)')).toBe(false);
    expect(control.matches(':state(success)')).toBe(true);
    expect(control.matches(':state(error)')).toBe(false);
  });

  it('should initialize success error for field', async () => {
    message.status = 'error';
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    expect(field.matches(':state(success)')).toBe(false);
    expect(field.matches(':state(error)')).toBe(true);
    expect(control.matches(':state(success)')).toBe(false);
    expect(control.matches(':state(error)')).toBe(true);
  });

  it('should clear existing states before setting new ones', async () => {
    // Set initial error state
    message.status = 'error';
    updateFieldStatusState(field, [message]);
    await elementIsStable(field);
    expect(field.matches(':state(error)')).toBe(true);

    // Change to success state
    message.status = 'success';
    updateFieldStatusState(field, [message]);
    await elementIsStable(field);
    expect(field.matches(':state(error)')).toBe(false);
    expect(field.matches(':state(success)')).toBe(true);
  });

  it('should not set states when message is hidden', async () => {
    message.setAttribute('hidden', '');
    message.status = 'success';
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    expect(field.matches(':state(success)')).toBe(false);
    expect(field.matches(':state(error)')).toBe(false);
    expect(control.matches(':state(success)')).toBe(false);
    expect(control.matches(':state(error)')).toBe(false);
  });

  it('should not set states when message has no status', async () => {
    message.status = 'error'; // Set a valid status first
    message.status = '' as any; // Then clear it for the test
    updateFieldStatusState(field, [message]);

    await elementIsStable(field);
    expect(field.matches(':state(success)')).toBe(false);
    expect(field.matches(':state(error)')).toBe(false);
    expect(control.matches(':state(success)')).toBe(false);
    expect(control.matches(':state(error)')).toBe(false);
  });

  it('should handle multiple messages and use the first non-hidden one', async () => {
    const message2 = document.createElement('bp-field-message');
    message2.status = 'success';
    field.appendChild(message2);

    // First message is hidden, second is visible with success
    message.setAttribute('hidden', '');
    message.status = 'error';

    updateFieldStatusState(field, [message, message2]);
    await elementIsStable(field);

    expect(field.matches(':state(success)')).toBe(true);
    expect(field.matches(':state(error)')).toBe(false);
    expect(control.matches(':state(success)')).toBe(true);
    expect(control.matches(':state(error)')).toBe(false);
  });
});
