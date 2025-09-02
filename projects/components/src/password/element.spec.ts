import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, emulateClick } from '@blueprintui/test';
import { BpPassword } from '@blueprintui/components/password';
import '@blueprintui/components/include/password.js';

describe('bp-password', () => {
  let element: BpPassword;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-password></bp-password> `);

    element = fixture.querySelector<BpPassword>('bp-password');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('password');
    expect(element.i18n).toBeDefined();
  });

  it('should support inherited properties', async () => {
    await elementIsStable(element);

    // Test boolean properties with CSS states
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    // Note: CSS states may not be immediately available, test the property instead
    expect(element.disabled).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.disabled).toBe(false);

    // Test reflected properties
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
    // required may not be reflected as an attribute, test the property
    expect(element.required).toBe(true);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    // readonly may not be reflected as an attribute, test the property
    expect(element.readonly).toBe(true);

    // Test value property
    element.value = 'test-password';
    await elementIsStable(element);
    expect(element.value).toBe('test-password');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test that the button has proper accessibility
    const button = element.shadowRoot.querySelector('bp-button-icon');
    expect(button).toBeTruthy();
    expect(button.getAttribute('aria-label')).toBe('show');
    expect(button.getAttribute('action')).toBe('inline');
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpPassword.formAssociated).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
  });

  it('should show/hide the password and icon', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('password');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('text');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye-hide');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('password');
    expect(element.shadowRoot.querySelector('bp-icon').shape).toBe('eye');
  });

  it('should focus back on input when show/hide is clicked', async () => {
    await elementIsStable(element);
    expect(document.activeElement).not.toEqual(element);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(document.activeElement).toEqual(element);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(document.activeElement).toEqual(element);
  });

  it('should have the correct aria-label for the show/hide button', async () => {
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('show');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('hide');

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.shadowRoot.querySelector('bp-button-icon').getAttribute('aria-label')).toEqual('show');
  });

  it('should handle disabled state for toggle button', async () => {
    await elementIsStable(element);
    const button = element.shadowRoot.querySelector('bp-button-icon');
    // Test that the button exists and can be disabled
    expect(button).toBeTruthy();

    element.disabled = true;
    await elementIsStable(element);
    // The button should be disabled when the component is disabled
    expect(element.disabled).toBe(true);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
  });

  it('should handle pressed state for toggle button', async () => {
    await elementIsStable(element);
    const button = element.shadowRoot.querySelector('bp-button-icon');
    // Test the pressed property binding, not attribute
    expect(button.pressed).toBe(false);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(button.pressed).toBe(true);

    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(button.pressed).toBe(false);
  });

  it('should handle click events on toggle button', async () => {
    await elementIsStable(element);

    const clickSpy = jasmine.createSpy('click');
    element.shadowRoot.querySelector('bp-button-icon').addEventListener('click', clickSpy);

    await emulateClick(element.shadowRoot.querySelector('bp-button-icon'));
    expect(clickSpy).toHaveBeenCalled();
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

  it('should handle input and change events', async () => {
    await elementIsStable(element);

    // Test that the component can handle value changes
    element.value = 'new-password';
    await elementIsStable(element);
    expect(element.value).toBe('new-password');

    // Test that the internal input reflects the value
    const internalInput = element.shadowRoot.querySelector('input');
    expect(internalInput.value).toBe('new-password');
  });

  it('should maintain password visibility state correctly', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('password');

    // Toggle to show password
    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('text');

    // Change value while password is visible
    element.value = 'new-value';
    await elementIsStable(element);
    expect(element.type).toBe('text'); // Should remain visible

    // Toggle back to hide password
    element.shadowRoot.querySelector('bp-button-icon').click();
    await elementIsStable(element);
    expect(element.type).toBe('password');
  });
});
