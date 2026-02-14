import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import type { BpButtonIcon } from '@blueprintui/components/button-icon';
import { BpTime } from '@blueprintui/components/time';
import '@blueprintui/components/include/time.js';

describe('bp-time', () => {
  let element: BpTime;
  let icon: BpButtonIcon;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>time</label>
        <bp-time></bp-time>
        <bp-field-message>message text</bp-field-message>
      </bp-field>
    `);
    element = fixture.querySelector<BpTime>('bp-time');
    icon = element.shadowRoot.querySelector('bp-button-icon');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-time')).toBe(BpTime);
  });

  it('should default its input type to "time"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('time');
  });

  it('should render time button', async () => {
    await elementIsStable(element);
    expect(icon.shape).toBe('clock');
  });

  it('should render time button with an aria-label', async () => {
    await elementIsStable(element);
    expect(icon.ariaLabel).toBe('expand');
  });

  it('should disable time button if input is disabled', async () => {
    await elementIsStable(element);
    expect(icon.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(icon.disabled).toBe(true);
  });

  it('should apply invalid styles when the state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
  });

  it('should have default i18n property', async () => {
    await elementIsStable(element);
    expect(element.i18n).toBeDefined();
    expect(typeof element.i18n).toBe('object');
  });

  it('should render button with inline action', async () => {
    await elementIsStable(element);
    expect(icon.action).toBe('inline');
  });

  it('should call showPicker when clock button is clicked', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const showPickerSpy = spyOn(input, 'showPicker');

    icon.click();
    await elementIsStable(element);

    expect(showPickerSpy).toHaveBeenCalled();
  });

  it('should handle readonly state', async () => {
    await elementIsStable(element);
    expect(element.readOnly).toBe(false);

    element.readOnly = true;
    await elementIsStable(element);
    expect(element.readOnly).toBe(true);
  });

  it('should handle value property', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('');

    element.value = '14:30';
    await elementIsStable(element);
    expect(element.value).toBe('14:30');
  });

  it('should handle placeholder property', async () => {
    await elementIsStable(element);
    expect(element.placeholder).toBe(''); // default is empty string

    element.placeholder = 'Enter time';
    await elementIsStable(element);
    expect(element.placeholder).toBe('Enter time');
  });

  it('should handle required property', async () => {
    await elementIsStable(element);
    expect(element.required).toBe(false);

    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
  });

  it('should handle min and max properties', async () => {
    await elementIsStable(element);
    expect(element.min).toBe(null);
    expect(element.max).toBe(null);

    element.min = '09:00';
    element.max = '17:00';
    await elementIsStable(element);
    expect(element.min).toBe('09:00');
    expect(element.max).toBe('17:00');
  });

  it('should handle size property', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(20); // default size

    element.size = 30;
    await elementIsStable(element);
    expect(element.size).toBe(30);
  });
});
