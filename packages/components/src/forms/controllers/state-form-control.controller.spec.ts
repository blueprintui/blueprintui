import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/components/test';
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

  it('should add the :--touched custom state style hook when input blurs', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('blur'));
    expect(element.matches(':--touched')).toBe(true);
  });

  it('should add the :--dirty custom state style hook when input blurs', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':--dirty')).toBe(true);
  });

  it('should add the :--checked custom state style hook when input is checked', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('change'));
    expect(element.matches(':--checked')).toBe(false);

    element.checked = true;
    element.dispatchEvent(new Event('change'));
    expect(element.matches(':--checked')).toBe(true);
  });

  it('should add the :--size custom state style hook when input "size" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':--size')).toBe(false);

    element.setAttribute('size', '3');
    await element.updateComplete;
    expect(element.matches(':--size')).toBe(true);

    element.removeAttribute('size');
    await element.updateComplete;
    expect(element.matches(':--size')).toBe(false);
  });

  it('should add the :--multiple custom state style hook when input "multiple" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':--multiple')).toBe(false);

    element.setAttribute('multiple', '');
    await element.updateComplete;
    expect(element.matches(':--multiple')).toBe(true);

    element.removeAttribute('multiple');
    await element.updateComplete;
    expect(element.matches(':--multiple')).toBe(false);
  });

  it('should add the :--readonly custom state style hook when input "readonly" changes', async () => {
    await element.updateComplete;
    expect(element.matches(':--readonly')).toBe(false);

    element.setAttribute('readonly', '');
    await element.updateComplete;
    expect(element.matches(':--readonly')).toBe(true);

    element.removeAttribute('readonly');
    await element.updateComplete;
    expect(element.matches(':--readonly')).toBe(false);
  });

  it('should add the :--checked custom state style hook when input "checked" attr changes', async () => {
    await element.updateComplete;
    expect(element.matches(':--checked')).toBe(false);

    element.setAttribute('checked', '');
    await element.updateComplete;
    expect(element.matches(':--checked')).toBe(true);

    element.removeAttribute('checked');
    await element.updateComplete;
    expect(element.matches(':--checked')).toBe(false);
  });

  it('should add the :--disabled custom state style hook when input "disabled" attr changes', async () => {
    await element.updateComplete;
    expect(element.matches(':--disabled')).toBe(false);

    element.setAttribute('disabled', '');
    await element.updateComplete;
    expect(element.matches(':--disabled')).toBe(true);

    element.removeAttribute('disabled');
    await element.updateComplete;
    expect(element.matches(':--disabled')).toBe(false);

    element.ariaDisabled = 'true';
    await element.updateComplete;
    expect(element.matches(':--disabled')).toBe(true);
  });

  it('should add the :--valid and :--invalid custom state style hook when input valid', async () => {
    await element.updateComplete;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':--valid')).toBe(true);
    expect(element.matches(':--invalid')).toBe(false);
  });

  it('should add the :--valid and :--invalid custom state style hook when input invalid', async () => {
    await element.updateComplete;
    element._validity = false;
    element.dispatchEvent(new Event('input'));
    expect(element.matches(':--invalid')).toBe(true);
    expect(element.matches(':--valid')).toBe(false);
  });
});
