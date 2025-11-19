import { html } from 'lit';
import '@blueprintui/components/include/button-captions.js';
import { BpButtonCaptions } from '@blueprintui/components/button-captions';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-captions element', () => {
  let fixture: HTMLElement;
  let element: BpButtonCaptions;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-captions></bp-button-captions>`);
    element = fixture.querySelector<BpButtonCaptions>('bp-button-captions');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-captions')).toBe(BpButtonCaptions);
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('captions');
  });

  it('should set role of button', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should set aria-pressed to false by default', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('false');
  });

  it('should set aria-pressed to true when checked', async () => {
    element.checked = true;
    await elementIsStable(element);
    expect(element._internals.ariaPressed).toBe('true');
  });

  it('should have default value of "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should reflect value to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('on');

    element.value = 'custom';
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('custom');
  });

  it('should support checked attribute', async () => {
    element.checked = true;
    await elementIsStable(element);
    expect(element.checked).toBe(true);
    expect(element.hasAttribute('checked')).toBe(true);
  });

  it('should display captions icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon).toBeTruthy();
    expect(icon.shape).toBe('captions');
    expect(icon.size).toBe('sm');
  });

  it('should display solid icon when checked', async () => {
    element.checked = true;
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.type).toBe('solid');
  });

  it('should display outline icon when unchecked', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.type).toBe('');
  });

  it('should not have a tabindex if disabled', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should not have a tabindex if readonly', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.readonly = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should support disabled state', async () => {
    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);
  });

  it('should support readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);

    expect(element.readonly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);
  });

  it('should have default i18n from I18nService', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n.captions).toBe('string');
  });

  it('should support custom i18n', async () => {
    const customI18n = { captions: 'Custom Captions Text' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.captions).toBe('Custom Captions Text');
  });

  it('should support custom slot content', async () => {
    element.innerHTML = '<bp-icon shape="custom" size="sm"></bp-icon>';
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();

    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].tagName.toLowerCase()).toBe('bp-icon');
    expect(assignedElements[0].getAttribute('shape')).toBe('custom');
  });

  it('should be form associated', async () => {
    await elementIsStable(element);
    expect(BpButtonCaptions.formAssociated).toBe(true);
  });

  it('should participate in forms when name is provided', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-button-captions name="captions" value="enabled"></bp-button-captions>
      </form>
    `);
    const formElement = formFixture.querySelector<BpButtonCaptions>('bp-button-captions');
    const form = formFixture.querySelector('form');

    await elementIsStable(formElement);
    formElement.checked = true;
    await elementIsStable(formElement);

    const formData = new FormData(form);
    expect(formData.get('captions')).toBe('enabled');

    formElement.checked = false;
    await elementIsStable(formElement);

    const formData2 = new FormData(form);
    expect(formData2.get('captions')).toBeNull();

    removeFixture(formFixture);
  });

  it('should have correct icon properties', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.getAttribute('role')).toBe('presentation');
    expect(icon.getAttribute('shape')).toBe('captions');
    expect(icon.getAttribute('size')).toBe('sm');
  });

  it('should toggle checked state on click', async () => {
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(false);
  });

  it('should not toggle when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should not toggle when readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should fire change event on user interaction', async () => {
    await elementIsStable(element);
    const changeSpy = jasmine.createSpy('change');
    element.addEventListener('change', changeSpy);

    element.click();
    await elementIsStable(element);

    expect(changeSpy).toHaveBeenCalled();
  });

  it('should fire input event on user interaction', async () => {
    await elementIsStable(element);
    const inputSpy = jasmine.createSpy('input');
    element.addEventListener('input', inputSpy);

    element.click();
    await elementIsStable(element);

    expect(inputSpy).toHaveBeenCalled();
  });

  it('should accept custom aria-label', async () => {
    element.setAttribute('aria-label', 'enable captions');
    await elementIsStable(element);
    expect(element.getAttribute('aria-label')).toBe('enable captions');
  });

  it('should support custom value attribute', async () => {
    element.value = 'custom-value';
    await elementIsStable(element);
    expect(element.value).toBe('custom-value');
    expect(element.getAttribute('value')).toBe('custom-value');
  });
});
