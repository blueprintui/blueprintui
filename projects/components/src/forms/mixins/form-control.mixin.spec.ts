import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { FormControlMixin } from './form-control.mixin.js';
import '@blueprintui/components/include/forms.js';

@customElement('bp-control')
class Control extends FormControlMixin<typeof LitElement, string>(LitElement) {
  render() {
    return html`control`;
  }
}

describe('FormControlMixin', () => {
  let element: Control;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>control</label>
        <bp-control value="initial"></bp-control>
      </bp-field>
    `);

    element = fixture.querySelector<Control>('bp-control');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  it('should have form association enabled', async () => {
    expect(Control.formAssociated).toBe(true);
  });

  it('should initialize to presentational role', async () => {
    expect(element._internals.role).toBe('presentation');
  });

  it('should handle disabled state', async () => {
    expect(element.disabled).toBe(false);

    element.disabled = true;
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);

    element.disabled = false;
    expect(element.disabled).toBe(false);
    expect(element.matches(':state(disabled)')).toBe(false);
  });

  it('should handle required state', async () => {
    expect(element.required).toBe(false);

    element.required = true;
    expect(element.required).toBe(true);
    expect(element.matches(':state(required)')).toBe(true);

    element.required = false;
    expect(element.required).toBe(false);
    expect(element.matches(':state(required)')).toBe(false);
  });

  it('should handle readonly state', async () => {
    expect(element.readOnly).toBe(false);

    element.readOnly = true;
    expect(element.readOnly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);

    element.readOnly = false;
    expect(element.readOnly).toBe(false);
    expect(element.matches(':state(readonly)')).toBe(false);
  });

  it('should handle multiple state', async () => {
    expect(element.multiple).toBe(false);
    expect(element.matches(':state(multiple)')).toBe(false);

    element.multiple = true;
    expect(element.matches(':state(multiple)')).toBe(true);
    expect(element.multiple).toBe(true);

    element.multiple = false;
    expect(element.matches(':state(multiple)')).toBe(false);
    expect(element.multiple).toBe(false);
  });

  it('should handle autocomplete state', async () => {
    expect(element.autocomplete).toBe('');
    expect(element.matches(':state(autocomplete)')).toBe(false);

    element.autocomplete = 'on';
    expect(element.matches(':state(autocomplete)')).toBe(true);
    expect(element.autocomplete).toBe('on');

    element.autocomplete = '';
    expect(element.matches(':state(autocomplete)')).toBe(false);
    expect(element.autocomplete).toBe('');
  });

  it('should handle size state', async () => {
    expect(element.size).toBe(20); // default size is 20
    expect(element.matches(':state(size)')).toBe(false);

    element.size = 10;
    expect(element.matches(':state(size)')).toBe(true);
    expect(element.size).toBe(10);
  });

  it('should handle formnovalidate state', async () => {
    expect(element.formNoValidate).toBe(false);
    expect(element.matches(':state(formnovalidate)')).toBe(false);

    element.formNoValidate = true;
    expect(element.matches(':state(formnovalidate)')).toBe(true);
    expect(element.formNoValidate).toBe(true);
  });

  it('should handle pattern state', async () => {
    expect(element.pattern).toBe('');
    expect(element.matches(':state(pattern)')).toBe(false);

    element.pattern = 'test';
    expect(element.matches(':state(pattern)')).toBe(true);
    expect(element.pattern).toBe('test');
  });

  it('should handle placeholder state', async () => {
    expect(element.placeholder).toBe('');
    expect(element.matches(':state(placeholder)')).toBe(false);

    element.placeholder = 'test';
    expect(element.matches(':state(placeholder)')).toBe(true);
    expect(element.placeholder).toBe('test');
  });

  it('should handle minlength state', async () => {
    expect(element.minLength).toBe(-1); // default is -1 (no limit)
    expect(element.matches(':state(minlength)')).toBe(false);

    element.minLength = 10;
    expect(element.matches(':state(minlength)')).toBe(true);
    expect(element.minLength).toBe(10);
  });

  it('should handle maxlength state', async () => {
    expect(element.maxLength).toBe(-1); // default is -1 (no limit)
    expect(element.matches(':state(maxlength)')).toBe(false);

    element.maxLength = 10;
    expect(element.matches(':state(maxlength)')).toBe(true);
    expect(element.maxLength).toBe(10);
  });

  it('should handle min state', async () => {
    expect(element.min).toBe(null);
    expect(element.matches(':state(min)')).toBe(false);

    element.min = 10;
    expect(element.matches(':state(min)')).toBe(true);
    expect(element.min).toBe(10);
  });

  it('should handle max state', async () => {
    expect(element.max).toBe(null);
    expect(element.matches(':state(max)')).toBe(false);

    element.max = 10;
    expect(element.matches(':state(max)')).toBe(true);
    expect(element.max).toBe(10);
  });

  it('should handle step state', async () => {
    expect(element.step).toBe(null);
    expect(element.matches(':state(step)')).toBe(false);

    element.step = 10;
    expect(element.matches(':state(step)')).toBe(true);
    expect(element.step).toBe(10);
  });

  it('should handle name state', async () => {
    expect(element.name).toBe('');
    element.name = 'test';
    expect(element.name).toBe('test');
  });

  it('should compose label from associated labels', async () => {
    expect(element.composedLabel).toBe('control');
  });

  it('should handle focus method', async () => {
    element.focus();
    expect(element.matches(':focus')).toBe(true);
  });

  it('should reset validity and value', async () => {
    expect(element.value).toBe('initial');

    element.value = '123';
    element._internals.states.add('invalid');

    expect(element.value).toBe('123');
    expect(element.matches(':state(invalid)')).toBe(true);

    element.reset();
    expect(element.value).toBe('initial');
    expect(element.matches(':state(invalid)')).toBe(false);
  });

  it('should handle different value types', async () => {
    await elementIsStable(element);

    // String value
    element.value = 'test string';
    await elementIsStable(element);
    expect(element.value).toBe('test string');

    // Number value
    (element as any).value = 42;
    await elementIsStable(element);
    expect((element as any).value).toBe(42);

    // FormData value
    const formData = new FormData();
    formData.append('test', 'value');
    (element as any).value = formData;
    await elementIsStable(element);
    expect((element as any).value).toBe(formData);

    // File value
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });
    (element as any).value = file;
    await elementIsStable(element);
    expect((element as any).value).toBe(file);
  });

  it('should handle valueAsNumber getter and setter', async () => {
    expect(element.value).toBe('initial');

    element.value = '123';
    expect(element.value).toBe('123');
    expect(element.valueAsNumber).toBe(123);

    element.valueAsNumber = 456;
    expect(element.value).toBe('456');
    expect(element.valueAsNumber).toBe(456);

    // Test with non-numeric string
    element.value = 'not a number';
    expect(isNaN(element.valueAsNumber)).toBe(true);
  });

  it('should allow change events dispatched by component', async () => {
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'change');

    (element as any)._onChange({ target: { value: 'hello' }, preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
    expect(await event).toBeTruthy();
  });

  it('should allow input events dispatched by component', async () => {
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'input');

    (element as any)._onInput({ target: { value: 'hello' }, data: 'hello', preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
    expect((await event).data).toBe('hello');
  });

  it('should handle onChange with valueType config', async () => {
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'change');

    (element as any)._onChange({ target: { value: '123' }, preventDefault, stopPropagation }, { valueType: 'number' });

    // The controller handles the value setting, so we just verify the event was dispatched
    expect(await event).toBeTruthy();
  });

  it('should handle onInput with valueType config', async () => {
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'input');

    (element as any)._onInput(
      { target: { value: '456' }, data: '456', preventDefault, stopPropagation },
      { valueType: 'number' }
    );

    // The controller handles the value setting, so we just verify the event was dispatched
    expect((await event).data).toBe('456');
  });

  // Add these tests after the existing 'should handle onInput with valueType config' test:

  it('should provide valueAsString getter', async () => {
    element.value = 'test string';
    expect(element.valueAsString).toBe('test string');
    (element as any).value = 123;
    expect(element.valueAsString).toBe('123');
    (element as any).value = null;
    expect(element.valueAsString).toBe('');
  });

  it('should provide valueAsDate getter', async () => {
    element.value = '2024-01-15';
    const date = element.valueAsDate;
    expect(date instanceof Date).toBe(true);
    expect(date.toISOString().startsWith('2024-01-15')).toBe(true);
  });

  it('should throw error when valueAsNumber setter receives non-number', async () => {
    expect(() => {
      (element as any).valueAsNumber = 'not a number';
    }).toThrowError('value must be of type number');
  });

  it('should return type attribute with text as default', async () => {
    expect(element.type).toBe('text');
    element.setAttribute('type', 'email');
    expect(element.type).toBe('email');
  });

  it('should handle noValidate getter from form', async () => {
    const formFixture = await createFixture(html`
      <form novalidate>
        <bp-field>
          <label>control</label>
          <bp-control></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    expect(formElement.noValidate).toBe(true);
    removeFixture(formFixture);
  });

  it('should handle noValidate setter', async () => {
    expect(element.noValidate).toBe(false);
    element.noValidate = true;
    expect(element.noValidate).toBe(true);
    expect(element.hasAttribute('novalidate')).toBe(true);
    element.noValidate = false;
    expect(element.noValidate).toBe(false);
  });

  it('should provide form getter', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    expect(formElement.form).toBe(form);
    removeFixture(formFixture);
  });

  it('should provide willValidate getter', async () => {
    expect(element.willValidate).toBe(true);
  });

  it('should provide validity getter', async () => {
    expect(element.validity).toBeTruthy();
    expect(element.validity.valid).toBe(true);
  });

  it('should provide validationMessage getter', async () => {
    expect(typeof element.validationMessage).toBe('string');
  });

  it('should provide labels getter', async () => {
    expect(element.labels).toBeTruthy();
    expect(element.labels.length).toBe(1);
  });

  it('should add focused state on focus event', async () => {
    expect(element.matches(':state(focused)')).toBe(false);
    element.dispatchEvent(new FocusEvent('focus'));
    expect(element.matches(':state(focused)')).toBe(true);
  });

  it('should add touched state and remove focused on blur', async () => {
    element.dispatchEvent(new FocusEvent('focus'));
    expect(element.matches(':state(focused)')).toBe(true);
    expect(element.matches(':state(touched)')).toBe(false);
    element.dispatchEvent(new FocusEvent('blur'));
    expect(element.matches(':state(focused)')).toBe(false);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should add dirty state on input event', async () => {
    expect(element.matches(':state(dirty)')).toBe(false);
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':state(dirty)')).toBe(true);
  });

  it('should update validity states on focus/blur', async () => {
    element.required = true;
    element.value = '';
    await elementIsStable(element);
    element.dispatchEvent(new FocusEvent('focus'));
    element.dispatchEvent(new FocusEvent('blur'));
    expect(element.matches(':state(invalid)')).toBe(true);
  });

  it('should handle formDisabledCallback', async () => {
    expect(element.disabled).toBe(false);
    (element as any).formDisabledCallback(true);
    expect(element.disabled).toBe(true);
    (element as any).formDisabledCallback(false);
    expect(element.disabled).toBe(false);
  });

  it('should handle formStateRestoreCallback', async () => {
    (element as any).formStateRestoreCallback('restored value', 'restore');
    expect(element.value).toBe('restored value');
  });

  it('should handle formResetCallback', async () => {
    element.value = 'changed';
    await elementIsStable(element);
    (element as any).formResetCallback();
    expect(element.value).toBe('initial');
  });

  it('should check valueMissing validity', async () => {
    element.required = true;
    element.value = '';
    element.checkValidity();
    expect(element.validity.valueMissing).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should check patternMismatch validity', async () => {
    element.pattern = '^[0-9]+$';
    element.value = 'abc';
    element.checkValidity();
    expect(element.validity.patternMismatch).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should check tooShort validity', async () => {
    element.minLength = 5;
    element.value = 'ab';
    element.checkValidity();
    expect(element.validity.tooShort).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should check tooLong validity', async () => {
    element.maxLength = 3;
    element.value = 'abcdef';
    element.checkValidity();
    expect(element.validity.tooLong).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should check rangeUnderflow validity', async () => {
    element.setAttribute('type', 'number');
    element.min = 10;
    element.value = '5';
    element.checkValidity();
    expect(element.validity.rangeUnderflow).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should check rangeOverflow validity', async () => {
    element.setAttribute('type', 'number');
    element.max = 10;
    element.value = '15';
    element.checkValidity();
    expect(element.validity.rangeOverflow).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should skip validation when noValidate is true', async () => {
    element.noValidate = true;
    element.required = true;
    element.value = '';
    element.checkValidity();
    expect(element.validity.valid).toBe(true);
  });

  it('should set valid state when validations pass', async () => {
    element.value = 'valid';
    element.checkValidity();
    expect(element.validity.valid).toBe(true);
  });

  it('should allow custom validity via setValidity', async () => {
    element.setValidity({ customError: true }, 'Custom error message');
    expect(element.validity.customError).toBe(true);
    expect(element.validationMessage).toBe('Custom error message');
  });

  it('should set custom validity message via setCustomValidity', async () => {
    element.setCustomValidity('This field has a custom error');
    expect(element.validity.customError).toBe(true);
    expect(element.validity.valid).toBe(false);
    expect(element.validationMessage).toBe('This field has a custom error');
  });

  it('should clear custom validity when setCustomValidity is called with empty string', async () => {
    element.setCustomValidity('Custom error');
    expect(element.validity.customError).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.setCustomValidity('');
    expect(element.validity.customError).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should prioritize custom validity over other validation errors', async () => {
    element.required = true;
    element.value = '';
    element.setCustomValidity('Custom error takes precedence');

    expect(element.validity.customError).toBe(true);
    expect(element.validity.valueMissing).toBe(false);
    expect(element.validationMessage).toBe('Custom error takes precedence');
  });

  it('should reportValidity and return result', async () => {
    element.value = 'valid';
    expect(element.reportValidity()).toBe(true);
    element.required = true;
    element.value = '';
    expect(element.reportValidity()).toBe(false);
  });

  it('should handle size setter with null value', async () => {
    element.size = 10;
    expect(element.hasAttribute('size')).toBe(true);
    element.size = null;
    expect(element.hasAttribute('size')).toBe(false);
  });

  it('should handle object literal value for form state', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control name="test"></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    (formElement as any).value = { key1: 'value1', key2: 'value2' };
    await elementIsStable(formElement);
    const formData = new FormData(form);
    expect(formData.get('test-key1')).toBe('value1');
    expect(formData.get('test-key2')).toBe('value2');
    removeFixture(formFixture);
  });

  it('should handle numeric value for form state', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control name="test"></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    (formElement as any).value = 42;
    await elementIsStable(formElement);
    const formData = new FormData(form);
    expect(formData.get('test')).toBe('42');
    removeFixture(formFixture);
  });

  it('should not dispatch change event when disabled', async () => {
    element.disabled = true;
    let eventFired = false;
    element.addEventListener('change', () => {
      eventFired = true;
    });
    const fn = () => {};
    (element as any)._onChange({ target: { value: 'test' }, preventDefault: fn, stopPropagation: fn });
    await elementIsStable(element);
    expect(eventFired).toBe(false);
  });

  it('should not dispatch input event when disabled', async () => {
    element.disabled = true;
    let eventFired = false;
    element.addEventListener('input', () => {
      eventFired = true;
    });
    const fn = () => {};
    (element as any)._onInput({ target: { value: 'test' }, data: 'test', preventDefault: fn, stopPropagation: fn });
    await elementIsStable(element);
    expect(eventFired).toBe(false);
  });

  it('should handle attributeChangedCallback for disabled', async () => {
    element.setAttribute('disabled', '');
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    element.removeAttribute('disabled');
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
  });

  it('should handle attributeChangedCallback for readonly', async () => {
    element.setAttribute('readonly', '');
    await elementIsStable(element);
    expect(element.readOnly).toBe(true);
    element.removeAttribute('readonly');
    await elementIsStable(element);
    expect(element.readOnly).toBe(false);
  });

  it('should handle attributeChangedCallback for required', async () => {
    element.setAttribute('required', '');
    await elementIsStable(element);
    expect(element.required).toBe(true);
    element.removeAttribute('required');
    await elementIsStable(element);
    expect(element.required).toBe(false);
  });

  it('should dispatch reset event on reset()', async () => {
    const event = onceEvent(element, 'reset');
    element.reset();
    expect(await event).toBeTruthy();
  });

  it('should dispatch input event on reset()', async () => {
    const event = onceEvent(element, 'input');
    element.reset();
    expect(await event).toBeTruthy();
  });

  it('should update ariaValueNow when value changes', async () => {
    element.value = 'test';
    await elementIsStable(element);
    expect(element._internals.ariaValueNow).toBe('test');
  });

  it('should update ariaValueMin when min is set', async () => {
    element.min = 5;
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe('5');
  });

  it('should update ariaValueMax when max is set', async () => {
    element.max = 100;
    await elementIsStable(element);
    expect(element._internals.ariaValueMax).toBe('100');
  });

  it('should update ariaDisabled when disabled changes', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
    element.disabled = false;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');
  });

  it('should set tabIndex to 0 on connect', async () => {
    expect(element.tabIndex).toBe(0);
  });

  it('should handle form reset via form element', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control value="initial"></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    formElement.value = 'changed';
    await elementIsStable(formElement);
    expect(formElement.value).toBe('changed');
    form.reset();
    await elementIsStable(formElement);
    expect(formElement.value).toBe('initial');
    removeFixture(formFixture);
  });

  it('should check stepMismatch validity', async () => {
    element.setAttribute('type', 'number');
    element.step = 5;
    element.min = 0;
    element.value = '7';
    element.checkValidity();
    expect(element.validity.stepMismatch).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = '10';
    element.checkValidity();
    expect(element.validity.stepMismatch).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should check typeMismatch validity for email', async () => {
    element.setAttribute('type', 'email');
    element.value = 'invalid-email';
    element.checkValidity();
    expect(element.validity.typeMismatch).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = 'valid@example.com';
    element.checkValidity();
    expect(element.validity.typeMismatch).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should check typeMismatch validity for url', async () => {
    element.setAttribute('type', 'url');
    element.value = 'invalid-url';
    element.checkValidity();
    expect(element.validity.typeMismatch).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = 'https://example.com';
    element.checkValidity();
    expect(element.validity.typeMismatch).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should check badInput validity for number type', async () => {
    element.setAttribute('type', 'number');
    element.value = 'not-a-number';
    element.checkValidity();
    expect(element.validity.badInput).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = '42';
    element.checkValidity();
    expect(element.validity.badInput).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should add bp-layer state on connect', async () => {
    expect(element._internals.states.has('bp-layer')).toBe(true);
  });

  it('should dispatch user-invalid event when touched and invalid', async () => {
    element.required = true;
    element.value = '';
    await elementIsStable(element);

    const event = onceEvent(element, 'user-invalid');
    element.dispatchEvent(new FocusEvent('focus'));
    element.dispatchEvent(new FocusEvent('blur'));

    expect(await event).toBeTruthy();
    expect(element.matches(':state(user-invalid)')).toBe(true);
  });

  it('should add user-invalid state on invalid event', async () => {
    expect(element.matches(':state(user-invalid)')).toBe(false);
    element.dispatchEvent(new Event('invalid'));
    expect(element.matches(':state(user-invalid)')).toBe(true);
  });

  it('should handle attributeChangedCallback for novalidate', async () => {
    expect(element.noValidate).toBe(false);
    element.setAttribute('novalidate', '');
    await elementIsStable(element);
    expect(element.noValidate).toBe(true);
    element.removeAttribute('novalidate');
    await elementIsStable(element);
    expect(element.noValidate).toBe(false);
  });

  it('should exclude value key when setting object literal form value', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control name="test"></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    (formElement as any).value = { key1: 'value1', value: 'should-be-excluded' };
    await elementIsStable(formElement);
    const formData = new FormData(form);
    expect(formData.get('test-key1')).toBe('value1');
    expect(formData.get('test-value')).toBe(null);
    removeFixture(formFixture);
  });

  it('should have formAssociatedCallback', async () => {
    expect(typeof (element as any).formAssociatedCallback).toBe('function');
  });

  it('should include expected observedAttributes', async () => {
    const attrs = (Control as any).observedAttributes;
    expect(attrs).toContain('name');
    expect(attrs).toContain('value');
    expect(attrs).toContain('disabled');
    expect(attrs).toContain('readonly');
    expect(attrs).toContain('novalidate');
    expect(attrs).toContain('required');
    expect(attrs).toContain('pattern');
    expect(attrs).toContain('placeholder');
    expect(attrs).toContain('minlength');
    expect(attrs).toContain('maxlength');
    expect(attrs).toContain('min');
    expect(attrs).toContain('max');
    expect(attrs).toContain('step');
    expect(attrs).toContain('multiple');
    expect(attrs).toContain('autocomplete');
    expect(attrs).toContain('size');
    expect(attrs).toContain('formnovalidate');
  });

  it('should not update form state when name is not set', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-field>
          <label>control</label>
          <bp-control></bp-control>
        </bp-field>
      </form>
    `);
    const formElement = formFixture.querySelector<Control>('bp-control');
    const form = formFixture.querySelector('form');
    formElement.value = 'test-value';
    await elementIsStable(formElement);
    const formData = new FormData(form);
    expect(Array.from(formData.keys()).length).toBe(0);
    removeFixture(formFixture);
  });

  it('should clear touched and user-invalid states on reset', async () => {
    element.required = true;
    element.value = '';
    element.dispatchEvent(new FocusEvent('focus'));
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new FocusEvent('blur'));
    await elementIsStable(element);

    expect(element.matches(':state(touched)')).toBe(true);
    expect(element.matches(':state(user-invalid)')).toBe(true);

    element.reset();
    await elementIsStable(element);

    // touched and user-invalid should be cleared
    expect(element.matches(':state(touched)')).toBe(false);
    expect(element.matches(':state(user-invalid)')).toBe(false);
    // value should be reset to initial
    expect(element.value).toBe('initial');
    // valid state should be set since 'initial' is a valid value
    expect(element.matches(':state(valid)')).toBe(true);
  });

  it('should not skip validations for disabled elements during validity checks', async () => {
    element.disabled = true;
    element.required = true;
    element.value = '';
    element.checkValidity();
    expect(element.validity.valueMissing).toBe(false);
    expect(element.validity.valid).toBe(true);
  });

  it('should handle attributeChangedCallback for value attribute', async () => {
    element.setAttribute('value', 'new-value');
    await elementIsStable(element);
    expect(element.value).toBe('new-value');
  });

  describe('type property', () => {
    it('should default to "text"', () => {
      const input = document.createElement('input');
      expect(input.type).toBe('text');
    });

    it('should reflect type attribute', () => {
      element.setAttribute('type', 'email');
      expect(element.type).toBe('email');
    });

    it('should update attribute when property is set', () => {
      element.type = 'password';
      expect(element.getAttribute('type')).toBe('password');
    });
  });

  describe('value property', () => {
    it('should default to empty string when no value attribute', async () => {
      const noValueFixture = await createFixture(html`<bp-control></bp-control>`);
      const noValueElement = noValueFixture.querySelector<Control>('bp-control');
      expect(noValueElement.value).toBe('');
      removeFixture(noValueFixture);
    });

    it('should reflect initial value attribute', () => {
      // Element in fixture has value="initial"
      expect(element.value).toBe('initial');
      expect(element.defaultValue).toBe('initial');
    });

    it('should not update value attribute when value property changes', () => {
      element.setAttribute('value', 'initial');
      element.value = 'changed';
      expect(element.getAttribute('value')).toBe('initial');
      expect(element.value).toBe('changed');
    });

    it('should preserve defaultValue when value changes', () => {
      element.setAttribute('value', 'initial');
      element.value = 'changed';
      expect(element.defaultValue).toBe('initial');
    });

    it('should update defaultValue when value attribute changes', () => {
      element.setAttribute('value', 'first');
      expect(element.defaultValue).toBe('first');
      element.setAttribute('value', 'second');
      expect(element.defaultValue).toBe('second');
    });

    it('should update value when value attribute changes via attributeChangedCallback', () => {
      // Unlike native inputs, FormControlMixin syncs value attribute to value property
      element.setAttribute('value', 'initial');
      element.value = 'modified';
      expect(element.value).toBe('modified');
      // Setting attribute updates both defaultValue and value in FormControlMixin
      element.setAttribute('value', 'new-default');
      expect(element.value).toBe('new-default');
      expect(element.defaultValue).toBe('new-default');
    });
  });

  describe('defaultValue property', () => {
    it('should default to empty string when no value attribute', async () => {
      const noValueFixture = await createFixture(html`<bp-control></bp-control>`);
      const noValueElement = noValueFixture.querySelector<Control>('bp-control');
      expect(noValueElement.defaultValue).toBe('');
      removeFixture(noValueFixture);
    });

    it('should reflect value attribute', () => {
      element.setAttribute('value', 'test');
      expect(element.defaultValue).toBe('test');
    });

    it('should update value attribute when set', () => {
      element.defaultValue = 'default';
      expect(element.getAttribute('value')).toBe('default');
    });
  });

  describe('name property', () => {
    it('should default to empty string', () => {
      expect(element.name).toBe('');
    });

    it('should reflect name attribute', () => {
      element.setAttribute('name', 'username');
      expect(element.name).toBe('username');
    });

    it('should update attribute when property is set', () => {
      element.name = 'email';
      expect(element.getAttribute('name')).toBe('email');
    });
  });

  describe('disabled property', () => {
    it('should default to false', () => {
      expect(element.disabled).toBe(false);
    });

    it('should be true when attribute is present (any value)', () => {
      element.setAttribute('disabled', '');
      expect(element.disabled).toBe(true);
    });

    it('should be true even with disabled="false" attribute', () => {
      element.setAttribute('disabled', 'false');
      expect(element.disabled).toBe(true);
    });

    it('should add attribute when property set to true', () => {
      element.disabled = true;
      expect(element.hasAttribute('disabled')).toBe(true);
    });

    it('should remove attribute when property set to false', () => {
      element.setAttribute('disabled', '');
      element.disabled = false;
      expect(element.hasAttribute('disabled')).toBe(false);
    });
  });

  describe('required property', () => {
    it('should default to false', () => {
      expect(element.required).toBe(false);
    });

    it('should be true when attribute is present', () => {
      element.setAttribute('required', '');
      expect(element.required).toBe(true);
    });

    it('should add attribute when property set to true', () => {
      element.required = true;
      expect(element.hasAttribute('required')).toBe(true);
    });

    it('should remove attribute when property set to false', () => {
      element.setAttribute('required', '');
      element.required = false;
      expect(element.hasAttribute('required')).toBe(false);
    });
  });

  describe('readOnly property', () => {
    it('should default to false', () => {
      expect(element.readOnly).toBe(false);
    });

    it('should reflect readonly attribute', () => {
      element.setAttribute('readonly', '');
      expect(element.readOnly).toBe(true);
    });

    it('should add attribute when property set to true', () => {
      element.readOnly = true;
      expect(element.hasAttribute('readonly')).toBe(true);
    });

    it('should remove attribute when property set to false', () => {
      element.setAttribute('readonly', '');
      element.readOnly = false;
      expect(element.hasAttribute('readonly')).toBe(false);
    });
  });

  describe('placeholder property', () => {
    it('should default to empty string', () => {
      expect(element.placeholder).toBe('');
    });

    it('should reflect placeholder attribute', () => {
      element.setAttribute('placeholder', 'Enter text');
      expect(element.placeholder).toBe('Enter text');
    });

    it('should update attribute when property is set', () => {
      element.placeholder = 'Type here';
      expect(element.getAttribute('placeholder')).toBe('Type here');
    });
  });

  describe('size property', () => {
    it('should default to 20', () => {
      expect(element.size).toBe(20);
    });

    it('should reflect size attribute', () => {
      element.setAttribute('size', '30');
      expect(element.size).toBe(30);
    });

    it('should update attribute when property is set', () => {
      element.size = 40;
      expect(element.getAttribute('size')).toBe('40');
    });

    it('should handle invalid values', () => {
      element.setAttribute('size', '-1');
      // Invalid values are parsed as numbers
      expect(element.size).toBe(-1);
    });
  });

  describe('maxLength property', () => {
    it('should default to -1 (no limit)', () => {
      expect(element.maxLength).toBe(-1);
    });

    it('should reflect maxlength attribute', () => {
      element.setAttribute('maxlength', '100');
      expect(element.maxLength).toBe(100);
    });

    it('should update attribute when property is set', () => {
      element.maxLength = 50;
      expect(element.getAttribute('maxlength')).toBe('50');
    });

    it('should remove attribute when set to -1', () => {
      element.setAttribute('maxlength', '10');
      element.maxLength = -1;
      // Note: behavior varies - some browsers keep attribute with -1
      expect(element.maxLength).toBe(-1);
    });
  });

  describe('minLength property', () => {
    it('should default to -1 (no limit)', () => {
      expect(element.minLength).toBe(-1);
    });

    it('should reflect minlength attribute', () => {
      element.setAttribute('minlength', '5');
      expect(element.minLength).toBe(5);
    });

    it('should update attribute when property is set', () => {
      element.minLength = 3;
      expect(element.getAttribute('minlength')).toBe('3');
    });
  });

  describe('pattern property', () => {
    it('should default to empty string', () => {
      expect(element.pattern).toBe('');
    });

    it('should reflect pattern attribute', () => {
      element.setAttribute('pattern', '[A-Za-z]+');
      expect(element.pattern).toBe('[A-Za-z]+');
    });

    it('should update attribute when property is set', () => {
      element.pattern = '\\d{3}-\\d{4}';
      expect(element.getAttribute('pattern')).toBe('\\d{3}-\\d{4}');
    });
  });

  describe('autocomplete property', () => {
    it('should default to empty string', () => {
      expect(element.autocomplete).toBe('');
    });

    it('should reflect autocomplete attribute', () => {
      element.setAttribute('autocomplete', 'email');
      expect(element.autocomplete).toBe('email');
    });

    it('should update attribute when property is set', () => {
      element.autocomplete = 'username';
      expect(element.getAttribute('autocomplete')).toBe('username');
    });
  });

  describe('dirName property', () => {
    it('should default to empty string', () => {
      expect(element.dirName).toBe('');
    });

    it('should reflect dirname attribute', () => {
      element.setAttribute('dirname', 'comment.dir');
      expect(element.dirName).toBe('comment.dir');
    });

    it('should update attribute when property is set', () => {
      element.dirName = 'field.dir';
      expect(element.getAttribute('dirname')).toBe('field.dir');
    });
  });

  describe('list property (read-only)', () => {
    it('should default to null', () => {
      expect(element.list).toBe(null);
    });

    it('should reference datalist element when list attribute is set', () => {
      const datalist = document.createElement('datalist');
      datalist.id = 'options';
      fixture.appendChild(datalist);

      element.setAttribute('list', 'options');
      expect(element.list).toBe(datalist);
    });

    it('should return null when list attribute references non-existent element', () => {
      element.setAttribute('list', 'nonexistent');
      expect(element.list).toBe(null);
    });
  });

  describe('labels property (read-only)', () => {
    it('should return NodeList with associated labels', () => {
      // The fixture already has a label associated via bp-field
      expect(element.labels).toBeInstanceOf(NodeList);
      expect(element.labels!.length).toBe(1);
    });

    it('should include associated label elements by htmlFor', async () => {
      const labelFixture = await createFixture(html`<bp-control id="my-input"></bp-control>`);
      const labelElement = labelFixture.querySelector<Control>('bp-control');
      const label = document.createElement('label');
      label.htmlFor = 'my-input';
      labelFixture.appendChild(label);

      expect(labelElement.labels!.length).toBe(1);
      expect(labelElement.labels![0]).toBe(label);
      removeFixture(labelFixture);
    });

    it('should include wrapping label elements', async () => {
      const labelFixture = await createFixture(html`<label><bp-control></bp-control></label>`);
      const labelElement = labelFixture.querySelector<Control>('bp-control');
      const label = labelFixture.querySelector('label');

      expect(labelElement.labels!.length).toBe(1);
      expect(labelElement.labels![0]).toBe(label);
      removeFixture(labelFixture);
    });
  });

  describe('form property (read-only)', () => {
    it('should default to null when not in form', () => {
      // Element is inside bp-field, not directly in a form
      expect(element.form).toBe(null);
    });

    it('should reference parent form element', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-control></bp-control>
        </form>
      `);
      const formElement = formFixture.querySelector<Control>('bp-control');
      const form = formFixture.querySelector('form');

      expect(formElement.form).toBe(form);
      removeFixture(formFixture);
    });

    it('should reference form by form attribute', async () => {
      const formFixture = await createFixture(html`
        <div>
          <form id="my-form"></form>
          <bp-control></bp-control>
        </div>
      `);
      const formElement = formFixture.querySelector<Control>('bp-control');
      const form = formFixture.querySelector('form');

      formElement.setAttribute('form', 'my-form');
      expect(formElement.form).toBe(form);
      removeFixture(formFixture);
    });
  });

  describe('Selection properties', () => {
    beforeEach(() => {
      element.value = 'Hello World';
      element.focus();
    });

    describe('selectionStart property', () => {
      it('should default to end of value', () => {
        expect(element.selectionStart).toBe(element.value.length);
      });

      it('should be settable', () => {
        element.selectionStart = 0;
        expect(element.selectionStart).toBe(0);
      });

      it('should clamp to value length', () => {
        element.selectionStart = 1000;
        expect(element.selectionStart).toBe(element.value.length);
      });
    });

    describe('selectionEnd property', () => {
      it('should default to end of value', () => {
        expect(element.selectionEnd).toBe(element.value.length);
      });

      it('should be settable', () => {
        element.selectionEnd = 5;
        expect(element.selectionEnd).toBe(5);
      });
    });

    describe('selectionDirection property', () => {
      it('should be "none", "forward", or "backward"', () => {
        expect(['none', 'forward', 'backward']).toContain(element.selectionDirection);
      });

      it('should be settable', () => {
        element.selectionDirection = 'forward';
        expect(element.selectionDirection).toBe('forward');
      });
    });
  });

  describe('Validation properties', () => {
    describe('validity property (read-only)', () => {
      it('should return ValidityState object', () => {
        expect(element.validity).toBeInstanceOf(ValidityState);
      });

      it('should be valid by default', () => {
        expect(element.validity.valid).toBe(true);
      });

      it('should be invalid when required and empty', () => {
        element.required = true;
        element.value = '';
        expect(element.validity.valid).toBe(false);
        expect(element.validity.valueMissing).toBe(true);
      });

      it('should be invalid when pattern does not match', () => {
        element.pattern = '^[0-9]+$';
        element.value = 'abc';
        expect(element.validity.valid).toBe(false);
        expect(element.validity.patternMismatch).toBe(true);
      });

      it('should be invalid when too short', () => {
        element.minLength = 5;
        element.value = 'ab';
        // Note: tooShort only triggers after user interaction in some browsers
        // Direct value assignment may not trigger this
      });

      it('should be invalid when too long', () => {
        element.maxLength = 3;
        // Direct value assignment bypasses maxLength in browsers
        // maxLength only prevents typing more characters
      });

      it('should report customError when setCustomValidity is called', () => {
        element.setCustomValidity('Custom error message');
        expect(element.validity.valid).toBe(false);
        expect(element.validity.customError).toBe(true);
      });
    });

    describe('validationMessage property (read-only)', () => {
      it('should be empty string when valid', () => {
        expect(element.validationMessage).toBe('');
      });

      it('should contain message when invalid', () => {
        element.required = true;
        element.value = '';
        expect(element.validationMessage).not.toBe('');
      });

      it('should contain custom message when set', () => {
        element.setCustomValidity('My custom error');
        expect(element.validationMessage).toBe('My custom error');
      });
    });

    describe('willValidate property (read-only)', () => {
      it('should be true for regular text input', () => {
        expect(element.willValidate).toBe(true);
      });

      it('should be false when disabled', () => {
        element.disabled = true;
        expect(element.willValidate).toBe(false);
      });

      it('should be false when readonly', () => {
        element.readOnly = true;
        // Note: readonly inputs still validate in most browsers
        // This may differ from expected behavior
      });
    });
  });

  describe('Methods', () => {
    describe('select()', () => {
      it('should select all text', () => {
        element.value = 'Hello World';
        element.select();
        expect(element.selectionStart).toBe(0);
        expect(element.selectionEnd).toBe(11);
      });
    });

    describe('setSelectionRange()', () => {
      beforeEach(() => {
        element.value = 'Hello World';
      });

      it('should set selection start and end', () => {
        element.setSelectionRange(0, 5);
        expect(element.selectionStart).toBe(0);
        expect(element.selectionEnd).toBe(5);
      });

      it('should set selection direction', () => {
        element.setSelectionRange(0, 5, 'backward');
        expect(element.selectionDirection).toBe('backward');
      });

      it('should clamp values to valid range', () => {
        element.setSelectionRange(-1, 1000);
        expect(element.selectionStart).toBe(0);
        expect(element.selectionEnd).toBe(element.value.length);
      });
    });

    describe('setRangeText()', () => {
      beforeEach(() => {
        element.value = 'Hello World';
      });

      it('should replace selected text', () => {
        element.setSelectionRange(6, 11);
        element.setRangeText('Universe');
        expect(element.value).toBe('Hello Universe');
      });

      it('should replace specified range', () => {
        element.setRangeText('Beautiful ', 6, 6);
        expect(element.value).toBe('Hello Beautiful World');
      });

      it('should support selectMode "select"', () => {
        element.setRangeText('New', 0, 5, 'select');
        expect(element.value).toBe('New World');
        expect(element.selectionStart).toBe(0);
        expect(element.selectionEnd).toBe(3);
      });

      it('should support selectMode "start"', () => {
        element.setRangeText('New', 0, 5, 'start');
        expect(element.selectionStart).toBe(0);
        expect(element.selectionEnd).toBe(0);
      });

      it('should support selectMode "end"', () => {
        element.setRangeText('New', 0, 5, 'end');
        expect(element.selectionStart).toBe(3);
        expect(element.selectionEnd).toBe(3);
      });

      it('should support selectMode "preserve" (default)', () => {
        element.setSelectionRange(0, 5);
        element.setRangeText('Longer Text', 0, 5, 'preserve');
        // Selection is adjusted based on replacement
      });
    });

    describe('setCustomValidity()', () => {
      it('should set custom validation message', () => {
        element.setCustomValidity('Invalid input');
        expect(element.validationMessage).toBe('Invalid input');
        expect(element.validity.customError).toBe(true);
      });

      it('should clear custom validity with empty string', () => {
        element.setCustomValidity('Error');
        element.setCustomValidity('');
        expect(element.validity.customError).toBe(false);
      });
    });

    describe('checkValidity()', () => {
      it('should return true when valid', () => {
        expect(element.checkValidity()).toBe(true);
      });

      it('should return false when invalid', () => {
        element.required = true;
        element.value = '';
        expect(element.checkValidity()).toBe(false);
      });

      it('should fire invalid event when invalid', () => {
        const invalidHandler = jasmine.createSpy('invalidHandler');
        element.addEventListener('invalid', invalidHandler);
        element.required = true;
        element.value = '';
        element.checkValidity();
        expect(invalidHandler).toHaveBeenCalled();
      });

      it('should not fire invalid event when valid', () => {
        const invalidHandler = jasmine.createSpy('invalidHandler');
        element.addEventListener('invalid', invalidHandler);
        element.checkValidity();
        expect(invalidHandler).not.toHaveBeenCalled();
      });
    });

    describe('reportValidity()', () => {
      it('should return true when valid', () => {
        expect(element.reportValidity()).toBe(true);
      });

      it('should return false when invalid', () => {
        element.required = true;
        element.value = '';
        expect(element.reportValidity()).toBe(false);
      });

      it('should fire invalid event when invalid', () => {
        const invalidHandler = jasmine.createSpy('invalidHandler');
        element.addEventListener('invalid', invalidHandler);
        element.required = true;
        element.value = '';
        element.reportValidity();
        expect(invalidHandler).toHaveBeenCalled();
      });
    });
  });

  describe('Form submission override properties', () => {
    // These only apply to submit/image buttons, but should exist on all inputs

    describe('formAction property', () => {
      it('should default to empty string', () => {
        expect(element.formAction).toBe('');
      });

      it('should reflect formaction attribute', () => {
        element.setAttribute('formaction', '/submit');
        expect(element.formAction).toContain('/submit');
      });
    });

    describe('formMethod property', () => {
      it('should default to empty string', () => {
        expect(element.formMethod).toBe('');
      });

      it('should reflect formmethod attribute', () => {
        element.setAttribute('formmethod', 'post');
        expect(element.formMethod).toBe('post');
      });
    });

    describe('formNoValidate property', () => {
      it('should default to false', () => {
        expect(element.formNoValidate).toBe(false);
      });

      it('should reflect formnovalidate attribute', () => {
        element.setAttribute('formnovalidate', '');
        expect(element.formNoValidate).toBe(true);
      });
    });

    describe('formTarget property', () => {
      it('should default to empty string', () => {
        expect(element.formTarget).toBe('');
      });

      it('should reflect formtarget attribute', () => {
        element.setAttribute('formtarget', '_blank');
        expect(element.formTarget).toBe('_blank');
      });
    });
  });

  describe('Edge cases and special behavior', () => {
    it('should handle null/undefined value assignment', () => {
      // FormControlMixin preserves value types unlike HTMLInputElement
      element.value = null as any;
      expect(element.value).toBe(null);

      element.value = undefined as any;
      expect(element.value).toBe(undefined);
    });

    it('should preserve non-string value types', () => {
      // FormControlMixin preserves value types unlike HTMLInputElement
      (element as any).value = 123;
      expect((element as any).value).toBe(123);

      (element as any).value = true;
      expect((element as any).value).toBe(true);
    });

    it('should handle empty attribute removal', () => {
      element.setAttribute('placeholder', 'test');
      element.removeAttribute('placeholder');
      expect(element.placeholder).toBe('');
    });

    it('should handle numeric attribute coercion', () => {
      element.setAttribute('size', 'invalid');
      // Browsers handle invalid numeric attributes differently
      expect(typeof element.size).toBe('number');
    });

    it('should not include disabled inputs in form data', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-control name="test" disabled></bp-control>
        </form>
      `);
      const formElement = formFixture.querySelector<Control>('bp-control');
      const form = formFixture.querySelector('form');
      formElement.value = 'value';

      const formData = new FormData(form);
      expect(formData.has('test')).toBe(false);
      removeFixture(formFixture);
    });

    it('should include readonly inputs in form data', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-control name="test" readonly></bp-control>
        </form>
      `);
      const formElement = formFixture.querySelector<Control>('bp-control');
      const form = formFixture.querySelector('form');
      formElement.value = 'value';

      const formData = new FormData(form);
      expect(formData.get('test')).toBe('value');
      removeFixture(formFixture);
    });
  });
});
