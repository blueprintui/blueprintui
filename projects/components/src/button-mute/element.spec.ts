import { html } from 'lit';
import '@blueprintui/components/include/button-mute.js';
import { BpButtonMute } from '@blueprintui/components/button-mute';
import { elementIsStable, createFixture, removeFixture } from '@blueprintui/test';

describe('button-mute element', () => {
  let fixture: HTMLElement;
  let element: BpButtonMute;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-button-mute name="audio-muted"></bp-button-mute>`);
    element = fixture.querySelector<BpButtonMute>('bp-button-mute');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-button-mute')).toBe(BpButtonMute);
  });

  it('should set a default ariaLabel', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaLabel).toBe('mute');
  });

  it('should set role of button', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('button');
  });

  it('should have default value of "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should reflect value to attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('on');

    element.value = 'muted';
    await elementIsStable(element);
    expect(element.getAttribute('value')).toBe('muted');
  });

  it('should display unmuted icon by default', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.checked).toBeFalsy();
    expect(icon.shape).toBe('volume');
    expect(icon.size).toBe('md');
  });

  it('should display muted icon when checked', async () => {
    element.checked = true;
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(element.checked).toBe(true);
    expect(icon.shape).toBe('volume-mute');
    expect(icon.size).toBe('md');
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
  });

  it('should support disabled state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.matches(':state(disabled)')).toBe(true);
    expect(element.tabIndex).toBe(-1);
  });

  it('should support readonly state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(false);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
    expect(element.tabIndex).toBe(-1);
  });

  it('should not toggle when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should not toggle when readonly', async () => {
    element.readonly = true;
    await elementIsStable(element);

    element.click();
    await elementIsStable(element);
    expect(element.checked).toBeFalsy();
  });

  it('should have default i18n from I18nService', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n.mute).toBe('string');
  });

  it('should support custom i18n', async () => {
    const customI18n = { mute: 'Custom Mute Text' };
    element.i18n = customI18n;
    await elementIsStable(element);
    expect(element.i18n.mute).toBe('Custom Mute Text');
  });

  it('should support custom slot content', async () => {
    element.innerHTML = '<bp-icon shape="bell" size="md"></bp-icon>';
    await elementIsStable(element);

    const slot = element.shadowRoot.querySelector('slot');
    const assignedElements = slot.assignedElements();

    expect(assignedElements.length).toBe(1);
    expect(assignedElements[0].tagName.toLowerCase()).toBe('bp-icon');
    expect(assignedElements[0].getAttribute('shape')).toBe('bell');
  });

  it('should be form associated', async () => {
    await elementIsStable(element);
    expect(element._internals.form).toBeNull(); // No form in test fixture
    expect(BpButtonMute.formAssociated).toBe(true);
  });

  it('should have name property', async () => {
    await elementIsStable(element);
    expect(element.name).toBe('audio-muted');
  });

  it('should have correct icon properties', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-icon');

    expect(icon.getAttribute('role')).toBe('presentation');
    expect(icon.getAttribute('shape')).toBe('volume');
    expect(icon.getAttribute('size')).toBe('md');
  });

  it('should reflect checked to attribute', async () => {
    await elementIsStable(element);
    expect(element.hasAttribute('checked')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.hasAttribute('checked')).toBe(true);

    element.checked = false;
    await elementIsStable(element);
    expect(element.hasAttribute('checked')).toBe(false);
  });

  it('should fire change event on click', async () => {
    await elementIsStable(element);
    let changeEventFired = false;

    element.addEventListener('change', () => {
      changeEventFired = true;
    });

    element.click();
    await elementIsStable(element);

    expect(changeEventFired).toBe(true);
  });

  it('should fire input event on click', async () => {
    await elementIsStable(element);
    let inputEventFired = false;

    element.addEventListener('input', () => {
      inputEventFired = true;
    });

    element.click();
    await elementIsStable(element);

    expect(inputEventFired).toBe(true);
  });
});
