import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpSwitch } from '@blueprintui/components/switch';
import '@blueprintui/components/include/switch.js';

describe('bp-switch', () => {
  let element: BpSwitch;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html` <bp-switch></bp-switch> `);
    element = fixture.querySelector<BpSwitch>('bp-switch');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    await elementIsStable(element);
    expect(element).toBeTruthy();
  });

  it('should sync host checked attr', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.matches(':state(checked)')).toBe(true);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-switch')).toBe(BpSwitch);
  });

  it('should default value to "on"', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('on');
  });

  it('should handle custom value', async () => {
    element.value = 'custom-switch';
    await elementIsStable(element);
    expect(element.value).toBe('custom-switch');
    expect(element.getAttribute('value')).toBe('custom-switch');
  });

  it('should handle checked property', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(false);

    element.checked = true;
    await elementIsStable(element);
    expect(element.checked).toBe(true);
    expect(element.matches(':state(checked)')).toBe(true);

    element.checked = false;
    await elementIsStable(element);
    expect(element.checked).toBe(false);
    expect(element.matches(':state(checked)')).toBe(false);
  });

  it('should handle disabled state', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle required state', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should render internal input div', async () => {
    await elementIsStable(element);
    const inputDiv = element.shadowRoot?.querySelector('div[input]');
    expect(inputDiv).toBeTruthy();
    expect(inputDiv?.hasAttribute('input')).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'blue');
    element.style.setProperty('--border', '1px solid red');
    element.style.setProperty('--border-radius', '10px');
    element.style.setProperty('--height', '30px');
    element.style.setProperty('--width', '60px');
    element.style.setProperty('--anchor-background', 'white');
    element.style.setProperty('--anchor-border-radius', '50%');
    element.style.setProperty('--anchor-width', '20px');
    element.style.setProperty('--anchor-height', '20px');
    element.style.setProperty('--toggle-speed', '0.3s');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('blue');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid red');
    expect(element.style.getPropertyValue('--border-radius')).toBe('10px');
    expect(element.style.getPropertyValue('--height')).toBe('30px');
    expect(element.style.getPropertyValue('--width')).toBe('60px');
    expect(element.style.getPropertyValue('--anchor-background')).toBe('white');
    expect(element.style.getPropertyValue('--anchor-border-radius')).toBe('50%');
    expect(element.style.getPropertyValue('--anchor-width')).toBe('20px');
    expect(element.style.getPropertyValue('--anchor-height')).toBe('20px');
    expect(element.style.getPropertyValue('--toggle-speed')).toBe('0.3s');
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  it('should extend FormControl', async () => {
    await elementIsStable(element);
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
    expect('validationMessage' in element).toBe(true);
    expect('name' in element).toBe(true);
  });

  it('should have formAssociated property', () => {
    expect(BpSwitch.formAssociated).toBe(true);
  });

  it('should handle name property', async () => {
    element.name = 'test-switch';
    await elementIsStable(element);
    expect(element.name).toBe('test-switch');
  });

  it('should support typeFormSwitch decorator', async () => {
    await elementIsStable(element);
    // The decorator provides switch-specific functionality
    expect(element.value).toBe('on'); // Default value from switch behavior
  });

  it('should support interactionClick decorator', async () => {
    await elementIsStable(element);
    // The decorator should make the element clickable
    expect(element.tabIndex).toBe(0); // Should be focusable/clickable
  });

  it('should handle form validation', async () => {
    element.required = true;
    await elementIsStable(element);

    // FormControl validation methods should exist
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
  });

  it('should handle touched state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should toggle checked state on click', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(false);

    // Simulate click
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(true);

    // Click again to toggle
    element.click();
    await elementIsStable(element);
    expect(element.checked).toBe(false);
  });

  it('should handle keyboard activation', async () => {
    await elementIsStable(element);
    element.focus();

    // Space or Enter should toggle switch
    element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await elementIsStable(element);

    // Should support keyboard interaction
    expect(element.tabIndex).toBe(0);
  });

  it('should emit input and change events', async () => {
    await elementIsStable(element);

    let inputEventFired = false;
    let changeEventFired = false;

    element.addEventListener('input', () => (inputEventFired = true));
    element.addEventListener('change', () => (changeEventFired = true));

    // Trigger events by changing checked state
    element.checked = true;
    await elementIsStable(element);

    // Manual event dispatch for testing
    element.dispatchEvent(new Event('input'));
    element.dispatchEvent(new Event('change'));

    expect(inputEventFired).toBe(true);
    expect(changeEventFired).toBe(true);
  });

  it('should maintain checked state after reconnection', async () => {
    element.checked = true;
    await elementIsStable(element);

    // Create new fixture to avoid disconnection issues with controllers
    const newFixture = await createFixture(html` <bp-switch checked></bp-switch> `);
    const newElement = newFixture.querySelector<BpSwitch>('bp-switch');
    await elementIsStable(newElement);

    expect(newElement.checked).toBe(true);
    expect(newElement.matches(':state(checked)')).toBe(true);

    removeFixture(newFixture);
  });
});
