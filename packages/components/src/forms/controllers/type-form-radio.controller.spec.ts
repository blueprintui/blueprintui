import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/components/test';
import { RadioControl, TypeFormRadioController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormRadioControllerTestElement extends RadioControl {} // eslint-disable-line

@customElement('type-form-radio-test-element')
class TypeFormRadioControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) value: string | FormData = '';

  @property({ type: Boolean, reflect: true }) checked: boolean;

  @property({ type: Boolean, reflect: true }) disabled: boolean;

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
    element.dispatchEvent(new Event('click'));

    await elementIsStable(element);
    await new Promise(r => setTimeout(r, 100)); // wait for all possible radio change events to be emitted

    expect(count).toBe(1);
    expect(element.matches(':--checked')).toBe(true);
    expect(elementTwo.matches(':--checked')).toBe(false);
    expect(elementThree.matches(':--checked')).toBe(false);
    expect(elementFour.matches(':--checked')).toBe(true);
  });
});
