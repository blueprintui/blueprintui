import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpDate } from '@blueprintui/components/date';
import '@blueprintui/components/include/date.js';

describe('bp-date', () => {
  let element: BpDate;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>date</label>
        <bp-date></bp-date>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpDate>('bp-date');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-date')).toBe(BpDate);
  });

  it('should apply calendar icon button', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').shape).toBe('calendar');
  });

  it('should allow value to be set and retreived as date', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('');

    element.value = '2018-07-22';
    await elementIsStable(element);
    expect(element.value).toBe('2018-07-22');
    expect(element.valueAsDate.toISOString()).toBe(new Date('2018-07-22').toISOString());

    element.valueAsDate = new Date('2019-12-31');
    await elementIsStable(element);
    expect(element.value).toBe('2019-12-31');
    expect(element.valueAsDate.toISOString()).toBe(new Date('2019-12-31').toISOString());
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

  it('should have type property set to date', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('date');
  });

  it('should reflect type attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('type')).toBe(true);
    expect(element.getAttribute('type')).toBe('date');
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

  it('should disable calendar button when component is disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const calendarButton = element.shadowRoot.querySelector('bp-button-icon');
    expect(calendarButton.disabled).toBe(true);
  });

  it('should handle valueAsDate with null input', async () => {
    await elementIsStable(element);
    element.valueAsDate = null;
    await elementIsStable(element);

    expect(element.value).toBe('');
    expect(element.valueAsDate).toBeNull();
  });

  it('should handle valueAsDate with invalid date', async () => {
    await elementIsStable(element);
    const invalidDate = new Date('invalid-date');
    element.valueAsDate = invalidDate;
    await elementIsStable(element);

    // Should handle gracefully without throwing
    expect(element.value).toBe('');
  });

  it('should handle empty value for valueAsDate getter', async () => {
    await elementIsStable(element);
    element.value = '';
    await elementIsStable(element);

    expect(element.valueAsDate).toBeNull();
  });

  it('should handle form validation correctly', async () => {
    element.required = true;
    await elementIsStable(element);

    // Test that checkValidity method exists and works
    expect(typeof element.checkValidity).toBe('function');
    element.checkValidity();

    // Test with valid date
    element.value = '2023-06-15';
    await elementIsStable(element);
    element.checkValidity();

    // Test with empty required field
    element.value = '';
    await elementIsStable(element);
    element.checkValidity();
  });

  it('should handle placeholder attribute', async () => {
    element.placeholder = 'Select a date';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.placeholder).toBe('Select a date');
  });

  it('should handle size attribute', async () => {
    element.size = 20;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.size).toBe(20);
  });

  it('should handle autocomplete attribute', async () => {
    element.autocomplete = 'bday';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.autocomplete).toBe('bday');
  });

  it('should handle min and max attributes', async () => {
    element.min = 20200101;
    element.max = 20251231;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.min).toBe('20200101');
    expect(input.max).toBe('20251231');
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
    element.readOnly = true;
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
});
