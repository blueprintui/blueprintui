import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';
import { stateFormControl } from '@blueprintui/components/forms';

@stateFormControl<StateFormControlControllerTestElement>()
@customElement('state-form-control-test-element')
class StateFormControlControllerTestElement extends LitElement {
  static formAssociated = true;
  checked = false;
  size: number;
  _validity = true;
  _internals = this.attachInternals();

  checkValidity() {
    return this._validity;
  }

  get validity() {
    return { valid: this._validity };
  }
}

describe('state-form-control.controller', () => {
  let element: StateFormControlControllerTestElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<state-form-control-test-element></state-form-control-test-element>`);
    element = fixture.querySelector<StateFormControlControllerTestElement>('state-form-control-test-element');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('state-form-control-test-element')).toBe(StateFormControlControllerTestElement);
  });

  it('should add the :state(touched) custom state style hook when input blurs', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('blur'));
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should add the :state(dirty) custom state style hook when input blurs', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':state(dirty)')).toBe(true);
  });

  it('should add thestate(checked) custom state style hook when input is checked', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('change'));
    expect(element.matches(':state(checked)')).toBe(false);

    element.checked = true;
    element.dispatchEvent(new Event('change'));
    expect(element.matches(':state(checked)')).toBe(true);
  });

  it('should add the :state(size) custom state style hook when input "size" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':state(size)')).toBe(false);

    element.setAttribute('size', '3');
    await element.updateComplete;
    expect(element.matches(':state(size)')).toBe(true);

    element.removeAttribute('size');
    await element.updateComplete;
    expect(element.matches(':state(size)')).toBe(false);
  });

  it('should add the :state(multiple) custom state style hook when input "multiple" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':state(multiple)')).toBe(false);

    element.setAttribute('multiple', '');
    await element.updateComplete;
    expect(element.matches(':state(multiple)')).toBe(true);

    element.removeAttribute('multiple');
    await element.updateComplete;
    expect(element.matches(':state(multiple)')).toBe(false);
  });

  it('should add the :state(readonly) custom state style hook when input "readonly" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':state(readonly)')).toBe(false);

    element.setAttribute('readonly', '');
    await element.updateComplete;
    expect(element.matches(':state(readonly)')).toBe(true);

    element.removeAttribute('readonly');
    await element.updateComplete;
    expect(element.matches(':state(readonly)')).toBe(false);
  });

  it('should add the :state(checked) custom state style hook when input "checked" attr changes', async () => {
    await element.updateComplete;
    expect(element.matches(':state(checked)')).toBe(false);

    element.setAttribute('checked', '');
    await element.updateComplete;
    expect(element.matches(':state(checked)')).toBe(true);

    element.removeAttribute('checked');
    await element.updateComplete;
    expect(element.matches(':state(checked)')).toBe(false);
  });

  it('should add the :state(disabled) custom state style hook when input "disabled" attr changes', async () => {
    await element.updateComplete;
    expect(element.matches(':state(disabled)')).toBe(false);

    element.setAttribute('disabled', '');
    await element.updateComplete;
    expect(element.matches(':state(disabled)')).toBe(true);

    element.removeAttribute('disabled');
    await element.updateComplete;
    expect(element.matches(':state(disabled)')).toBe(false);

    element.ariaDisabled = 'true';
    await element.updateComplete;
    expect(element.matches(':state(disabled)')).toBe(true);
  });

  it('should add the :state(valid) and :state(invalid) custom state style hook when input valid', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':state(valid)')).toBe(true);
    expect(element.matches(':state(invalid)')).toBe(false);
  });

  it('should add the :state(valid) and :state(invalid) custom state style hook when input invalid', async () => {
    await element.updateComplete;
    element._validity = false;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':state(invalid)')).toBe(true);
    expect(element.matches(':state(valid)')).toBe(false);
  });

  it('should not apply validation states when form has novalidate attribute', async () => {
    await element.updateComplete;

    const form = document.createElement('form');
    form.setAttribute('novalidate', '');
    form.appendChild(element);
    document.body.appendChild(form);

    expect(element.validity.valid).toBe(true);

    expect(element.matches(':state(valid)')).toBe(false);
    expect(element.matches(':state(invalid)')).toBe(false);

    document.body.removeChild(form);
  });

  it('should apply validation states when form does not have novalidate attribute', async () => {
    await element.updateComplete;

    // Create a form without novalidate and add the element to it
    const form = document.createElement('form');
    form.appendChild(element);
    document.body.appendChild(form);

    // Set element to invalid state
    element._validity = false;
    element.dispatchEvent(new Event('input'));

    // Should have validation states when novalidate is not present
    expect(element.matches(':state(invalid)')).toBe(true);
    expect(element.matches(':state(valid)')).toBe(false);

    // Clean up
    document.body.removeChild(form);
  });
});
