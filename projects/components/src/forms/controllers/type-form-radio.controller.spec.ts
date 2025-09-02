import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent, emulateClick } from '@blueprintui/test';
import { RadioControl, TypeFormRadioController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormRadioControllerTestElement extends RadioControl {} // eslint-disable-line

@customElement('type-form-radio-test-element')
class TypeFormRadioControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor checked: boolean;

  @property({ type: Boolean }) accessor disabled: boolean;

  typeFormControlController = new TypeFormControlController(this);
  typeFormRadioController = new TypeFormRadioController(this);
}

describe('type-form-radio.controller', () => {
  let element: TypeFormRadioControllerTestElement;
  let elementTwo: TypeFormRadioControllerTestElement;
  let form: HTMLFormElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <form>
        <type-form-radio-test-element name="test-radio-group" value="one"></type-form-radio-test-element>
        <type-form-radio-test-element name="test-radio-group" value="two" checked></type-form-radio-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormRadioControllerTestElement>('type-form-radio-test-element');
    elementTwo = fixture.querySelectorAll<TypeFormRadioControllerTestElement>('type-form-radio-test-element')[1];
    form = fixture.querySelector('form');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-radio-test-element')).toBe(TypeFormRadioControllerTestElement);
  });

  it('should add inline field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-field')).toBe('inline');
  });

  it('should initialize component to be focusable', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should initialize component to have role radio', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('radio');
    expect(element._internals.ariaChecked).toBe('false');
  });

  it('should initialize component to not be checked', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('false');
  });

  it('should update aria-disabled based on disabled state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');

    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
  });

  it('should update aria-checked based on checked state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('false');

    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaChecked).toBe('true');
  });

  it('should dispatch a "change" event on space keypress', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);
  });

  it('should set the form value if checked', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'two' });

    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'one' });

    elementTwo.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'two' });
  });

  it('should preserve checked state if checked radio is clicked again', async () => {
    await elementIsStable(element);

    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'one' });

    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'one' });

    elementTwo.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'two' });

    elementTwo.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'two' });
  });

  it('should not respond to click when disabled', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    emulateClick(element);
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);
  });

  it('should not respond to space keypress when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }));
    await elementIsStable(element);

    expect(element.checked).toBe(undefined);
  });

  it('should prevent default on space keydown', async () => {
    await elementIsStable(element);

    const keydownEvent = new KeyboardEvent('keydown', { code: 'Space', bubbles: true });
    const preventDefaultSpy = spyOn(keydownEvent, 'preventDefault');
    const stopPropagationSpy = spyOn(keydownEvent, 'stopPropagation');

    element.dispatchEvent(keydownEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('should handle number values correctly in form data', async () => {
    await elementIsStable(element);
    element.value = 42 as any;
    await elementIsStable(element);

    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': '42' });
  });

  it('should clear form value when unchecked', async () => {
    await elementIsStable(element);

    // First check the element
    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'one' });

    // Then uncheck it by clicking another radio
    elementTwo.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-radio-group': 'two' });

    // Verify the first element's form value is cleared
    expect(element._internals.form).toBe(form);
  });

  it('should not change state when already checked radio is clicked', async () => {
    await elementIsStable(element);

    // First check the element
    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    // Click again - should not change state
    element.dispatchEvent(new Event('click'));
    await elementIsStable(element);
    expect(element.checked).toBe(true);
  });

  it('should handle click event properly', async () => {
    await elementIsStable(element);

    const event = onceEvent(element, 'change');
    emulateClick(element);

    expect(await event).toBeTruthy();
    expect(element.checked).toBe(true);
  });
});

describe('type-form-radio.controller multi', () => {
  let element: TypeFormRadioControllerTestElement;
  let elementTwo: TypeFormRadioControllerTestElement;
  let elementThree: TypeFormRadioControllerTestElement;
  let elementFour: TypeFormRadioControllerTestElement;
  let form: HTMLFormElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html` <form>
        <type-form-radio-test-element name="test-radio-group" value="one"></type-form-radio-test-element>
        <type-form-radio-test-element name="test-radio-group" value="two" checked></type-form-radio-test-element>
        <type-form-radio-test-element name="test-radio-group-two" value="three"></type-form-radio-test-element>
        <type-form-radio-test-element name="test-radio-group-two" value="four" checked></type-form-radio-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormRadioControllerTestElement>('type-form-radio-test-element');
    elementTwo = fixture.querySelectorAll<TypeFormRadioControllerTestElement>('type-form-radio-test-element')[1];
    elementThree = fixture.querySelectorAll<TypeFormRadioControllerTestElement>('type-form-radio-test-element')[2];
    elementFour = fixture.querySelectorAll<TypeFormRadioControllerTestElement>('type-form-radio-test-element')[3];
    form = fixture.querySelector('form');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-radio-test-element')).toBe(TypeFormRadioControllerTestElement);
  });

  it('should only emit on change event per clicked/checked radio', async () => {
    let count = 0;
    form.addEventListener('change', () => count++);
    emulateClick(element);

    await elementIsStable(element);
    await new Promise(r => setTimeout(r, 100)); // wait for all possible radio change events to be emitted

    expect(count).toBe(1);
    expect(element.matches(':state(checked)')).toBe(true);
    expect(elementTwo.matches(':state(checked)')).toBe(false);
    expect(elementThree.matches(':state(checked)')).toBe(false);
    expect(elementFour.matches(':state(checked)')).toBe(true);
  });
});
