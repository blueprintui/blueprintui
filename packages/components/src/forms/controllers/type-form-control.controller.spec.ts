import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';
import { TypeFormControl, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormControlControllerTestElement extends TypeFormControl {} // eslint-disable-line

@customElement('type-form-control-test-element')
class TypeFormControlControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) value: string | FormData = '';

  @property({ type: Boolean, reflect: true }) required: boolean;

  typeFormControlController = new TypeFormControlController(this);
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

    element.setAttribute('min', '2');
    element.value = '1';
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(false);
    expect(element.validity.tooShort).toBe(true);
    expect(element.validationMessage).toBe('value too short');
  });

  it('should report validity rule tooLong', async () => {
    await elementIsStable(element);
    expect(element.validationMessage).toBe('');

    element.setAttribute('max', '2');
    element.value = '123';
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
});
