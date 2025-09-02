import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpRange } from '@blueprintui/components/range';
import '@blueprintui/components/include/range.js';

describe('bp-range', () => {
  let element: BpRange;
  let internalRange: HTMLInputElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>range</label>
        <bp-range></bp-range>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpRange>('bp-range');
    internalRange = element.shadowRoot.querySelector('input');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-range')).toBe(BpRange);
  });

  it('should set the internal range aria-label from user provided label', async () => {
    await elementIsStable(element);
    expect(internalRange.ariaLabel).toBe('range');
  });

  it('should set the internal range value', async () => {
    await elementIsStable(element);
    expect(internalRange.value).toBe('50');

    element.value = 100;
    await elementIsStable(element);
    expect(internalRange.value).toBe('100');
  });

  it('should set the internal range min', async () => {
    await elementIsStable(element);
    expect(internalRange.min).toBe('0');

    element.min = 10;
    await elementIsStable(element);
    expect(internalRange.min).toBe('10');
  });

  it('should set the internal range max', async () => {
    await elementIsStable(element);
    expect(internalRange.max).toBe('100');

    element.max = 75;
    await elementIsStable(element);
    expect(internalRange.max).toBe('75');
  });

  it('should set the internal range step', async () => {
    await elementIsStable(element);
    expect(internalRange.step).toBe('1');

    element.step = 5;
    await elementIsStable(element);
    expect(internalRange.step).toBe('5');
  });

  it('should set the internal range disabled', async () => {
    await elementIsStable(element);
    expect(internalRange.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(internalRange.disabled).toBe(true);
  });

  it('should handle default property values', async () => {
    await elementIsStable(element);
    expect(element.value).toBe(50);
    expect(element.step).toBe(1);
    expect(element.min).toBe(undefined);
    expect(element.max).toBe(undefined);
  });

  it('should handle form validation', async () => {
    element.required = true;
    await elementIsStable(element);

    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
  });

  it('should handle readonly state', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle name property', async () => {
    element.name = 'test-range';
    await elementIsStable(element);
    expect(element.name).toBe('test-range');
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal.getAttribute('role')).toBe('presentation');

    const input = element.shadowRoot.querySelector('input');
    expect(input).toBeTruthy();
    expect(input.type).toBe('range');
    expect(input.hasAttribute('input')).toBe(true);
  });

  it('should handle input and change events', async () => {
    await elementIsStable(element);

    let inputEventFired = false;
    let changeEventFired = false;

    element.addEventListener('input', () => (inputEventFired = true));
    element.addEventListener('change', () => (changeEventFired = true));

    // Simulate input event
    const inputEvent = new Event('input', { bubbles: true });
    internalRange.value = '75';
    internalRange.dispatchEvent(inputEvent);

    // Simulate change event
    const changeEvent = new Event('change', { bubbles: true });
    internalRange.dispatchEvent(changeEvent);

    expect(inputEventFired).toBe(true);
    expect(changeEventFired).toBe(true);
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
  });

  it('should handle touched state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--accent-color', 'blue');
    element.style.setProperty('--height', '8px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--accent-color')).toBe('blue');
    expect(element.style.getPropertyValue('--height')).toBe('8px');
  });

  it('should handle value as number correctly', async () => {
    await elementIsStable(element);

    element.value = 25;
    await elementIsStable(element);
    expect(element.value).toBe(25);
    expect(internalRange.valueAsNumber).toBe(25);

    element.value = 0;
    await elementIsStable(element);
    expect(element.value).toBe(0);
    expect(internalRange.valueAsNumber).toBe(0);
  });

  it('should handle min/max constraints', async () => {
    element.min = 20;
    element.max = 80;
    element.value = 50;
    await elementIsStable(element);

    expect(internalRange.min).toBe('20');
    expect(internalRange.max).toBe('80');
    expect(internalRange.valueAsNumber).toBe(50);
  });

  it('should handle step increments', async () => {
    element.step = 10;
    element.min = 0;
    element.max = 100;
    await elementIsStable(element);

    expect(internalRange.step).toBe('10');
  });

  it('should handle form submission', async () => {
    element.name = 'test-range';
    element.value = 75;
    await elementIsStable(element);

    expect(element.name).toBe('test-range');
    expect(element.value).toBe(75);
  });

  it('should maintain composedLabel from associated label', async () => {
    await elementIsStable(element);
    expect(element.composedLabel).toBe('range');
    expect(internalRange.ariaLabel).toBe('range');
  });

  it('should handle disabled state preventing interaction', async () => {
    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(internalRange.disabled).toBe(true);
  });

  it('should handle decimal step values', async () => {
    element.step = 0.1;
    element.min = 0;
    element.max = 1;
    element.value = 0.5;
    await elementIsStable(element);

    expect(internalRange.step).toBe('0.1');
    expect(internalRange.valueAsNumber).toBe(0.5);
  });

  it('should handle large ranges', async () => {
    element.min = 0;
    element.max = 1000;
    element.step = 50;
    element.value = 500;
    await elementIsStable(element);

    expect(internalRange.min).toBe('0');
    expect(internalRange.max).toBe('1000');
    expect(internalRange.step).toBe('50');
    expect(internalRange.valueAsNumber).toBe(500);
  });

  it('should have formAssociated property', () => {
    expect(BpRange.formAssociated).toBe(true);
  });

  it('should handle pristine/dirty states', async () => {
    await elementIsStable(element);

    element.value = 75;
    await elementIsStable(element);

    // Verify the value changed
    expect(element.value).toBe(75);
  });
});
