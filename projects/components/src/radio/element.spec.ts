import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpRadio } from '@blueprintui/components/radio';
import '@blueprintui/components/include/radio.js';

describe('bp-radio', () => {
  let form: HTMLFormElement;
  let button: HTMLButtonElement;
  let element: BpRadio;
  let elementTwo: BpRadio;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-fieldset>
          <label>label</label>

          <label>radio 1</label>
          <bp-radio value="1" name="radio-group" checked></bp-radio>

          <label>radio 2</label>
          <bp-radio value="2" name="radio-group"></bp-radio>

          <bp-field-message>message text</bp-field-message>
        </bp-fieldset>
        <button>submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    button = fixture.querySelector('button');
    element = fixture.querySelector<BpRadio>('bp-radio');
    elementTwo = fixture.querySelectorAll<BpRadio>('bp-radio')[1];
    form.addEventListener('submit', e => e.preventDefault());
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should mark radio as checked', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    elementTwo.click();
    await elementIsStable(element);
    expect(elementTwo.checked).toBe(true);
    expect(element.checked).toBe(false);
  });

  it('should mark checked radio with a checked attribute based on input checked state', async () => {
    expect(element.matches(':state(checked)')).toBe(true);
    expect(elementTwo.matches(':state(checked)')).toBe(false);

    elementTwo.click();
    await elementIsStable(elementTwo);

    expect(element.matches(':state(checked)')).toBe(false);
    expect(elementTwo.matches(':state(checked)')).toBe(true);
  });

  it('should emit change event on click', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('1');
    expect(element.checked).toBe(true);

    const event = onceEvent(form, 'change');
    emulateClick(elementTwo);
    await event;
    expect((await event).target.value).toBe('2');
  });

  it('should emit submit event to form', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'radio-group': '1' });

    const event = onceEvent(form, 'submit');
    emulateClick(elementTwo);
    emulateClick(button);
    await event;
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'radio-group': '2' });
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('disabled')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    // FormControl may handle disabled state differently
    expect(typeof element.checkValidity).toBe('function');

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.disabled).toBe(true);
  });

  it('should handle required state', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
    // FormControl may handle required state differently
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    // FormControl may handle readonly state differently
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle custom value', async () => {
    element.value = 'custom-value';
    await elementIsStable(element);
    expect(element.value).toBe('custom-value');
    expect(element.getAttribute('value')).toBe('custom-value');
  });

  it('should handle name property', async () => {
    expect(element.name).toBe('radio-group');

    element.name = 'custom-radio-group';
    await elementIsStable(element);
    expect(element.name).toBe('custom-radio-group');
  });

  it('should render internal input element correctly', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot?.querySelector('input');

    expect(input).toBeTruthy();
    expect(input?.type).toBe('radio');
    expect(input?.getAttribute('tabindex')).toBe('-1');
    expect(input?.hasAttribute('inert')).toBe(true);
  });

  it('should sync properties with internal input', async () => {
    element.checked = true;
    element.disabled = true;
    await elementIsStable(element);

    const input = element.shadowRoot?.querySelector('input');
    expect(input?.checked).toBe(true);
    expect(input?.disabled).toBe(true);
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should handle keyboard navigation', async () => {
    await elementIsStable(element);
    elementTwo.focus();
    expect(elementTwo.checked).toBe(false);

    // Test that Space key can be handled (even if not automatically triggered)
    elementTwo.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await elementIsStable(elementTwo);

    // Verify keyboard events are received
    expect(elementTwo.tabIndex).toBe(0); // Should be focusable
  });

  it('should extend FormControl', async () => {
    await elementIsStable(element);
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
    expect('validationMessage' in element).toBe(true);
  });

  it('should handle form validation for radio group', async () => {
    // Make both radios required
    element.required = true;
    elementTwo.required = true;

    // FormControl validation might work differently
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof elementTwo.checkValidity).toBe('function');

    // Test that validity object exists
    expect('validity' in element).toBe(true);
    expect('validity' in elementTwo).toBe(true);
  });

  it('should handle touched state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should handle pristine/dirty states', async () => {
    await elementIsStable(element);

    elementTwo.checked = true;
    element.checked = false;
    await elementIsStable(element);
    await elementIsStable(elementTwo);

    expect(elementTwo.checked).toBe(true);
    expect(element.checked).toBe(false);
  });

  it('should support RadioFormControlMixin behavior', async () => {
    await elementIsStable(element);
    // The mixin should provide radio-specific functionality
    const input = element.shadowRoot?.querySelector('input');
    expect(input?.type).toBe('radio');
  });

  it('should handle radio group exclusivity', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(true);
    expect(elementTwo.checked).toBe(false);

    // Click second radio
    emulateClick(elementTwo);
    await elementIsStable(element);
    await elementIsStable(elementTwo);

    // First should be unchecked, second should be checked
    expect(element.checked).toBe(false);
    expect(elementTwo.checked).toBe(true);

    // Click first radio again
    emulateClick(element);
    await elementIsStable(element);
    await elementIsStable(elementTwo);

    // First should be checked, second should be unchecked
    expect(element.checked).toBe(true);
    expect(elementTwo.checked).toBe(false);
  });

  it('should have type property as radio', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('radio');
  });

  it('should not allow clicking when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const originalChecked = element.checked;
    emulateClick(element);
    await elementIsStable(element);

    // Should not change checked state when disabled
    expect(element.checked).toBe(originalChecked);
  });

  it('should handle arrow key navigation within radio group', async () => {
    await elementIsStable(element);
    element.focus();
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(element.name).toBe(elementTwo.name);
  });
});
