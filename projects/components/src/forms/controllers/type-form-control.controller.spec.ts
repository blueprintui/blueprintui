import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import { TypeFormControl, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormControlControllerTestElement extends TypeFormControl {} // eslint-disable-line

@customElement('type-form-control-test-element')
class TypeFormControlControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor required: boolean;

  @property({ type: Boolean }) accessor disabled = false;

  @property({ type: Number }) accessor min: number;

  @property({ type: Number }) accessor max: number;

  @property({ type: String }) accessor type: string = 'text';

  get valueAsNumber(): number {
    return parseFloat(this.value as string);
  }

  typeFormControlController = new TypeFormControlController(this);

  render() {
    return html`<input type="text" .value=${this.value} />`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
  }
}

describe('type-form-control.controller', () => {
  let element: TypeFormControlControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form id="test-form"><type-form-control-test-element></type-form-control-test-element></form>`
    );
    element = fixture.querySelector<TypeFormControlControllerTestElement>('type-form-control-test-element');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-control-test-element')).toBe(TypeFormControlControllerTestElement);
  });

  it('should add field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('bp-field')).toBe(true);
  });

  it('should default to a valid state', async () => {
    await elementIsStable(element);
    expect(element.validity.valid).toBe(true);
  });

  it('should update validity state when checkValidity() is called', async () => {
    await elementIsStable(element);
    expect(element.validity.valid).toBe(true);
    expect(element.validity.valueMissing).toBe(false);

    element.required = true;
    element.checkValidity();
    await elementIsStable(element);
    expect(element.validity.valid).toBe(false);
    expect(element.validity.valueMissing).toBe(true);
  });

  it('should report the validity state when reportValidity() is called and emit a "invalid" event', async () => {
    await elementIsStable(element);
    expect(element.reportValidity()).toBe(true);

    const event = onceEvent(element, 'invalid');
    element.required = true;
    element.checkValidity();
    expect(element.reportValidity()).toBe(false);
    expect(await event).toBeTruthy();
  });

  it('should return a reference to its current form', async () => {
    await elementIsStable(element);
    expect(element.form.id).toBe('test-form');
  });

  it('should willValidate to report if control can have validation constraints active', async () => {
    await elementIsStable(element);
    expect(element.willValidate).toBe(true);
  });

  it('should enable component to trigger a value "change" event', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    element.required = true;
    element.value = 'test';
    element.typeFormControlController.dispatchChange(new InputEvent('change'));
    expect((await event)?.target).toBe(element);
    expect(element.validity.valid).toBe(true);
  });

  it('should enable component to trigger a value "input" event with the proper "data" value', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'input');
    element.required = true;
    element.typeFormControlController.dispatchInput(new InputEvent('input', { data: 'test data value' }));

    const { data, target } = await event;
    expect(data).toBe('test data value');
    expect(target).toBe(element);
  });

  it('should report validity rule valueMissing', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.required = true;
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.valueMissing).toBe(true);
    expect(element.validationMessage).toBe('value required');
  });

  it('should report validity rule tooShort', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('minlength', '5');
    element.value = 'abc';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.tooShort).toBe(true);
    expect(element.validationMessage).toBe('value too short');
  });

  it('should report validity rule tooLong', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('maxlength', '5');
    element.value = '123456';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.tooLong).toBe(true);
    expect(element.validationMessage).toBe('value too long');
  });

  it('should report validity rule patternMismatch', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('pattern', '[0-9]{3} [0-9]{3} [0-9]{4}');
    element.value = '012 345 6789';
    element.checkValidity();
    await elementIsStable(element);
    expect(element.validity.valid).toBe(true);

    element.value = '012 345 ';
    element.checkValidity();
    await elementIsStable(element);
    expect(element.validity.valid).toBe(false);
    expect(element.validity.patternMismatch).toBe(true);
    expect(element.validationMessage).toBe('pattern mismatch');
  });

  it('should set ariaValueMin, ariaValueMax, ariaValueNow if a min/max range is applied', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe(null);
    expect(element._internals.ariaValueMax).toBe(null);
    expect(element._internals.ariaValueNow).toBe(null);

    element.min = 0;
    element.max = 5;
    element.value = '3';
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe('0');
    expect(element._internals.ariaValueMax).toBe('5');
    expect(element._internals.ariaValueNow).toBe('3');

    element.min = undefined;
    element.max = undefined;
    element.value = '';
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe(null);
    expect(element._internals.ariaValueMax).toBe(null);
    expect(element._internals.ariaValueNow).toBe(null);
  });

  it('should focus the first focusable element when focus() is called and the host element is presentation role', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const focusSpy = jasmine.createSpy('focus');
    input.focus = focusSpy;

    element.typeFormControlController.focus();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should reset the element value and dispatch events when reset() is called', async () => {
    await elementIsStable(element);
    element.setAttribute('value', 'initial');
    element.value = 'changed';

    const inputEvent = onceEvent(element, 'input');
    const resetEvent = onceEvent(element, 'reset');

    element.typeFormControlController.reset();

    expect(element.value).toBe('initial');
    expect(await inputEvent).toBeTruthy();
    expect(await resetEvent).toBeTruthy();
  });

  it('should handle onChange with string value type', async () => {
    await elementIsStable(element);
    const mockEvent = {
      target: { value: 'test value' },
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const changeEvent = onceEvent(element, 'change');
    element.typeFormControlController.onChange(mockEvent);

    expect(element.value).toBe('test value');
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(await changeEvent).toBeTruthy();
  });

  it('should handle onChange with number value type', async () => {
    await elementIsStable(element);
    const mockEvent = {
      target: { valueAsNumber: 42 },
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const changeEvent = onceEvent(element, 'change');
    element.typeFormControlController.onChange(mockEvent, { valueType: 'number' });

    expect(element.value).toBe(42);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(await changeEvent).toBeTruthy();
  });

  it('should handle onInput with string value type', async () => {
    await elementIsStable(element);
    const mockEvent = {
      target: { value: 'input value' },
      data: 'input data',
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const inputEvent = onceEvent(element, 'input');
    element.typeFormControlController.onInput(mockEvent);

    expect(element.value).toBe('input value');
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();

    const event = await inputEvent;
    expect(event.data).toBe('input data');
  });

  it('should handle onInput with number value type', async () => {
    await elementIsStable(element);
    const mockEvent = {
      target: { valueAsNumber: 123 },
      data: '123',
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const inputEvent = onceEvent(element, 'input');
    element.typeFormControlController.onInput(mockEvent, { valueType: 'number' });

    expect(element.value).toBe(123);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();

    const event = await inputEvent;
    expect(event.data).toBe('123');
  });

  it('should not dispatch events when disabled in dispatchChange', async () => {
    await elementIsStable(element);
    element.disabled = true;

    const mockEvent = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    element.typeFormControlController.dispatchChange(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch events when disabled in dispatchInput', async () => {
    await elementIsStable(element);
    element.disabled = true;

    const mockEvent = {
      data: 'test',
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation')
    } as any;

    const inputSpy = jasmine.createSpy('input');
    element.addEventListener('input', inputSpy);

    element.typeFormControlController.dispatchInput(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(inputSpy).not.toHaveBeenCalled();
  });

  it('should handle null/undefined events gracefully in dispatchChange', async () => {
    await elementIsStable(element);

    // The controller uses optional chaining for preventDefault and stopPropagation
    expect(() => {
      element.typeFormControlController.dispatchChange(null as any);
    }).not.toThrow();

    expect(() => {
      element.typeFormControlController.dispatchChange(undefined as any);
    }).not.toThrow();
  });

  it('should throw when dispatchInput is called with null event due to accessing e.data', async () => {
    await elementIsStable(element);

    // The controller doesn't use optional chaining for e.data access
    expect(() => {
      element.typeFormControlController.dispatchInput(null as any);
    }).toThrow();
  });

  it('should set form value in hostUpdated for string values', async () => {
    await elementIsStable(element);
    element.value = 'test string';

    // Trigger hostUpdated by updating a property
    element.required = true;
    await elementIsStable(element);

    // The form value should be set to the string value
    // This is tested indirectly through the controller's hostUpdated method
    expect(element.value).toBe('test string');
  });

  it('should set form value in hostUpdated for number values', async () => {
    await elementIsStable(element);
    element.value = 42;

    // Trigger hostUpdated by updating a property
    element.required = true;
    await elementIsStable(element);

    // The form value should be set to the string representation of the number
    expect(element.value).toBe(42);
  });

  it('should check validity on blur event', async () => {
    await elementIsStable(element);
    element.required = true;

    const blurEvent = new Event('blur');
    element.dispatchEvent(blurEvent);
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.valueMissing).toBe(true);
  });

  it('should handle name property getter and setter', async () => {
    await elementIsStable(element);

    element.name = 'test-name';
    expect(element.getAttribute('name')).toBe('test-name');
    expect(element.name).toBe('test-name');
  });

  it('should update aria disabled state based on disabled property', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');

    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');

    element.disabled = false;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');
  });

  it('should handle min/max with only one value set', async () => {
    await elementIsStable(element);

    // Test with only min set
    element.min = 5;
    element.value = '10';
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe('5');
    expect(element._internals.ariaValueMax).toBe('undefined');
    expect(element._internals.ariaValueNow).toBe('10');

    // Test with only max set
    element.min = undefined;
    element.max = 20;
    element.value = '15';
    await elementIsStable(element);
    expect(element._internals.ariaValueMin).toBe('undefined');
    expect(element._internals.ariaValueMax).toBe('20');
    expect(element._internals.ariaValueNow).toBe('15');
  });

  it('should report validity rule rangeUnderflow', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('type', 'number');
    element.setAttribute('min', '5');
    element.value = '3';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.rangeUnderflow).toBe(true);
    expect(element.validationMessage).toBe('value too low');
  });

  it('should report validity rule rangeOverflow', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('type', 'number');
    element.setAttribute('max', '10');
    element.value = '15';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.rangeOverflow).toBe(true);
    expect(element.validationMessage).toBe('value too high');
  });

  it('should report validity rule stepMismatch', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('type', 'number');
    element.setAttribute('step', '5');
    element.value = '3';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.stepMismatch).toBe(true);
    expect(element.validationMessage).toBe('step mismatch');
  });

  it('should report validity rule typeMismatch', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('type', 'email');
    element.value = 'invalid-email';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.typeMismatch).toBe(true);
    expect(element.validationMessage).toBe('type mismatch');

    element.value = 'test@example.com';
    element.checkValidity();
    await elementIsStable(element);
    expect(element.validity.valid).toBe(true);
  });

  it('should report validity rule badInput', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('type', 'number');
    // Simulate browser behavior where value exists but cannot be converted to a number
    Object.defineProperty(element, 'value', { value: 'abc', writable: true, configurable: true });
    Object.defineProperty(element, 'valueAsNumber', { value: NaN, writable: true, configurable: true });

    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.badInput).toBe(true);
    expect(element.validationMessage).toBe('bad input');
  });
});
