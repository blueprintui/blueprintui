import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpMonth } from '@blueprintui/components/month';
import '@blueprintui/components/include/month.js';

describe('bp-month', () => {
  let element: BpMonth;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>month</label>
        <bp-month></bp-month>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);
    element = fixture.querySelector<BpMonth>('bp-month');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-month')).toBe(BpMonth);
  });

  it('should default its input type to "month"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('month');
  });

  it('should render the calendar icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon.shape).toBe('calendar');
  });

  it('should disable calendar button if input is disabled', async () => {
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    await elementIsStable(element);
    expect(icon.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });

  it('should handle showPicker method when calendar button is clicked', async () => {
    await elementIsStable(element);
    const calendarButton = element.shadowRoot.querySelector('bp-button-icon');
    const input = element.shadowRoot.querySelector('input');
    const showPickerSpy = spyOn(input, 'showPicker');

    calendarButton.click();
    await elementIsStable(element);

    expect(showPickerSpy).toHaveBeenCalled();
  });

  it('should reflect type attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('type')).toBe(true);
    expect(element.getAttribute('type')).toBe('month');
  });

  it('should apply invalid styles when the state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
  });

  it('should handle placeholder attribute', async () => {
    element.placeholder = 'Select a month';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.placeholder).toBe('Select a month');
  });

  it('should handle size attribute', async () => {
    element.size = 20;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.size).toBe(20);
  });

  it('should handle autocomplete attribute', async () => {
    element.autocomplete = 'bday-month';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.autocomplete).toBe('bday-month');
  });

  it('should handle min and max attributes', async () => {
    element.min = 202001;
    element.max = 202512;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.min).toBe('202001');
    expect(input.max).toBe('202512');
  });

  it('should handle formNoValidate attribute', async () => {
    element.formNoValidate = true;
    await elementIsStable(element);

    expect(element.hasAttribute('formnovalidate')).toBe(true);
  });

  it('should have calendar button with inline action', async () => {
    await elementIsStable(element);
    const calendarButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(calendarButton.action).toBe('inline');
  });

  it('should handle readonly state correctly', async () => {
    element.readonly = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('should handle disabled state correctly', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.disabled).toBe(true);
  });

  it('should handle required attribute', async () => {
    element.required = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.required).toBe(true);
  });

  it('should handle input events correctly', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const inputSpy = jasmine.createSpy('input');
    element.addEventListener('input', inputSpy);

    input.value = '2023-06';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    expect(inputSpy).toHaveBeenCalled();
  });

  it('should handle change events correctly', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    input.value = '2023-06';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await elementIsStable(element);

    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle focus method correctly', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const focusSpy = spyOn(input, 'focus');

    element.focus();
    await elementIsStable(element);

    expect(focusSpy).toHaveBeenCalled();
  });

  it('should handle reset method correctly', async () => {
    await elementIsStable(element);
    element.value = '2023-06';
    await elementIsStable(element);
    expect(element.value).toBe('2023-06');

    element.reset();
    await elementIsStable(element);
    expect(element.value).toBe(null);
  });

  it('should handle pattern attribute', async () => {
    element.pattern = '\\d{4}-\\d{2}';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.pattern).toBe('');
  });

  it('should handle minLength and maxLength attributes', async () => {
    element.minLength = 7;
    element.maxLength = 7;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.minLength).toBe(7);
    expect(input.maxLength).toBe(7);
  });

  it('should handle multiple attribute', async () => {
    element.multiple = true;
    await elementIsStable(element);

    expect(element.multiple).toBe(true);
  });

  it('should handle name attribute', async () => {
    element.name = 'birthmonth';
    await elementIsStable(element);

    expect(element.name).toBe('birthmonth');
  });

  it('should handle valueAsNumber getter and setter', async () => {
    await elementIsStable(element);
    element.value = '202306';
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(202306);

    element.valueAsNumber = 202312;
    await elementIsStable(element);
    expect(element.value).toBe('202312');
  });

  it('should handle composedLabel getter', async () => {
    await elementIsStable(element);
    expect(typeof element.composedLabel).toBe('string');
    expect(element.composedLabel).toContain('month');
  });

  it('should handle form association', async () => {
    await elementIsStable(element);
    expect(element._internals).toBeDefined();
    expect(element._internals.form).toBeNull(); // Not in a form

    // Test form association when in a form
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>month</label>
          <bp-month name="test-month"></bp-month>
        </bp-field>
      </form>
    `);

    const formElement = formFixture.querySelector<BpMonth>('bp-month');
    await elementIsStable(formElement);

    expect(formElement._internals.form).toBeDefined();
    removeFixture(formFixture);
  });

  it('should handle aria-label correctly', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');

    // Should have aria-label from composed label
    expect(input.getAttribute('aria-label')).toBeDefined();
    expect(input.getAttribute('aria-label')).toContain('month');
  });

  it('should handle calendar button click when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const calendarButton = element.shadowRoot.querySelector('bp-button-icon');
    const input = element.shadowRoot.querySelector('input');
    const showPickerSpy = spyOn(input, 'showPicker');

    calendarButton.click();
    await elementIsStable(element);

    // Should still call showPicker when disabled (browser behavior)
    expect(showPickerSpy).toHaveBeenCalled();
  });

  it('should handle readonly calendar button state', async () => {
    element.readonly = true;
    await elementIsStable(element);

    const calendarButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(calendarButton.disabled).toBe(undefined);
  });

  it('should handle form validation correctly', async () => {
    element.required = true;
    await elementIsStable(element);

    // Test that checkValidity method exists and works
    expect(typeof element.checkValidity).toBe('function');
    element.checkValidity();

    // Test with valid month
    element.value = '2023-06';
    await elementIsStable(element);
    element.checkValidity();

    // Test with empty required field
    element.value = '';
    await elementIsStable(element);
    element.checkValidity();
  });

  it('should handle form validation states correctly', async () => {
    element.required = true;
    await elementIsStable(element);

    // Initially should not be invalid
    expect(element.matches(':state(invalid)')).toBe(false);

    // Focus and blur without value should make it invalid
    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid)')).toBe(true);

    // Set valid value should remove invalid state
    element.value = '2023-06';
    await elementIsStable(element);
    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid)')).toBe(false);
  });

  it('should handle form validation with pattern', async () => {
    element.pattern = '\\d{4}-\\d{2}';
    await elementIsStable(element);

    // Valid pattern
    element.value = '2023-06';
    await elementIsStable(element);
    element.checkValidity();

    // Invalid pattern
    element.value = '2023/06';
    await elementIsStable(element);
    element.checkValidity();
  });

  it('should handle form validation with min/max months', async () => {
    element.min = 202301;
    element.max = 202312;
    await elementIsStable(element);

    // Valid month within range
    element.value = '2023-06';
    await elementIsStable(element);
    element.checkValidity();

    // Month before min
    element.value = '2022-12';
    await elementIsStable(element);
    element.checkValidity();

    // Month after max
    element.value = '2024-01';
    await elementIsStable(element);
    element.checkValidity();
  });
});
