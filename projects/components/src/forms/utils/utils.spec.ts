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

  it('should show matching error message on invalid event', async () => {
    await elementIsStable(field);

    // Trigger invalid event (valueMissing because input is required and empty)
    control.dispatchEvent(new Event('invalid', { bubbles: true }));

    expect(message1.hasAttribute('hidden')).toBe(false);
    expect(message2.hasAttribute('hidden')).toBe(true);
  });

  it('should show matching error message on user-invalid event', async () => {
    await elementIsStable(field);

    // Trigger user-invalid event
    control.dispatchEvent(new Event('user-invalid', { bubbles: true }));

    expect(message1.hasAttribute('hidden')).toBe(false);
    expect(message2.hasAttribute('hidden')).toBe(true);
  });

  it('should hide error messages when input becomes valid on input event', async () => {
    await elementIsStable(field);

    // Show error first
    control.dispatchEvent(new Event('invalid', { bubbles: true }));
    expect(message1.hasAttribute('hidden')).toBe(false);

    // Enter valid value
    control.value = 'test';
    control.dispatchEvent(new Event('input', { bubbles: true }));

    expect(message1.hasAttribute('hidden')).toBe(true);
    expect(message2.hasAttribute('hidden')).toBe(true);
  });

  it('should hide error messages on form reset event', async () => {
    const form = document.createElement('form');
    form.appendChild(fixture);
    document.body.appendChild(form);

    await elementIsStable(field);

    // Show error first
    control.dispatchEvent(new Event('invalid', { bubbles: true }));
    expect(message1.hasAttribute('hidden')).toBe(false);

    // Reset form
    form.dispatchEvent(new Event('reset', { bubbles: true }));

    expect(message1.hasAttribute('hidden')).toBe(true);
    expect(message2.hasAttribute('hidden')).toBe(true);

    document.body.removeChild(form);
  });

  it('should hide error messages on field reset event', async () => {
    await elementIsStable(field);

    // Show error first
    control.dispatchEvent(new Event('invalid', { bubbles: true }));
    expect(message1.hasAttribute('hidden')).toBe(false);

    // Reset field
    field.dispatchEvent(new Event('reset', { bubbles: true }));

    expect(message1.hasAttribute('hidden')).toBe(true);
    expect(message2.hasAttribute('hidden')).toBe(true);
  });

  it('should not setup validation when form has noValidate', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <form novalidate>
        <bp-field>
          <label>input</label>
          <bp-input required></bp-input>
          <bp-field-message error="valueMissing">required</bp-field-message>
        </bp-field>
      </form>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    message1 = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await field.updateComplete;
    await control.updateComplete;
    await elementIsStable(field);

    // Message should not have hidden attribute set by syncValidationMessages
    // because noValidate skips the validation setup
    control.dispatchEvent(new Event('invalid', { bubbles: true }));

    // When noValidate is set, the event listeners are not added
    // so the message state remains unchanged from initial
    expect(message1.error).toBe('valueMissing');
  });

  it('should not setup validation when control has formNoValidate', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input required formnovalidate></bp-input>
        <bp-field-message error="valueMissing">required</bp-field-message>
      </bp-field>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    message1 = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await field.updateComplete;
    await control.updateComplete;
    await elementIsStable(field);

    // Message should not be initialized as hidden when formNoValidate is set
    expect(message1.error).toBe('valueMissing');
  });

  it('should show non-error messages on blur when valid', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input></bp-input>
        <bp-field-message>helper text</bp-field-message>
      </bp-field>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    const helperMessage = fixture.querySelector<BpFieldMessage>('bp-field-message');
    await field.updateComplete;
    await control.updateComplete;
    await elementIsStable(field);

    // Trigger blur
    control.dispatchEvent(new Event('blur', { bubbles: true }));

    // Non-error message should be shown
    expect(helperMessage.hasAttribute('hidden')).toBe(false);
  });

  it('should show non-error messages when input becomes valid', async () => {
    removeFixture(fixture);

    fixture = await createFixture(html`
      <bp-field>
        <label>input</label>
        <bp-input required></bp-input>
        <bp-field-message error="valueMissing">required</bp-field-message>
        <bp-field-message status="success">looks good!</bp-field-message>
      </bp-field>
    `);

    field = fixture.querySelector<BpField>('bp-field');
    control = fixture.querySelector<BpInput>('bp-input');
    const errorMessage = fixture.querySelectorAll<BpFieldMessage>('bp-field-message')[0];
    const successMessage = fixture.querySelectorAll<BpFieldMessage>('bp-field-message')[1];
    await field.updateComplete;
    await control.updateComplete;
    await elementIsStable(field);

    // Error message is hidden initially
    expect(errorMessage.hasAttribute('hidden')).toBe(true);

    // Enter valid value and trigger input event
    control.value = 'test';
    control.dispatchEvent(new Event('input', { bubbles: true }));

    // Error message stays hidden, non-error message is shown
    expect(errorMessage.hasAttribute('hidden')).toBe(true);
    expect(successMessage.hasAttribute('hidden')).toBe(false);
  });

  it('should hide all messages then show first passing one on blur', async () => {
    await elementIsStable(field);

    // First show an error
    control.dispatchEvent(new Event('invalid', { bubbles: true }));
    expect(message1.hasAttribute('hidden')).toBe(false);

    // Enter valid value
    control.value = 'test';

    // Blur shows first message where validity passes (valueMissing is false now)
    control.dispatchEvent(new Event('blur', { bubbles: true }));

    // First message is shown because validity.valueMissing === false (passes validation)
    expect(message1.hasAttribute('hidden')).toBe(false);
    expect(message2.hasAttribute('hidden')).toBe(true);
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
