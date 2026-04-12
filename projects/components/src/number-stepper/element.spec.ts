import { html } from 'lit';
import { BpNumberStepper } from '@blueprintui/components/number-stepper';
import '@blueprintui/components/include/number-stepper.js';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpFieldMessage } from '../forms/index.js';

describe('bp-number-stepper', () => {
  let element: BpNumberStepper;
  let label: HTMLLabelElement;
  let message: BpFieldMessage;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>Quantity</label>
        <bp-number-stepper value="5" min="0" max="10"></bp-number-stepper>
        <bp-field-message>Select quantity</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpNumberStepper>('bp-number-stepper');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-number-stepper')).toBe(BpNumberStepper);
  });

  it('should have default properties', async () => {
    const defaultElement = await createFixture(html`<bp-number-stepper></bp-number-stepper>`);
    const stepper = defaultElement.querySelector<BpNumberStepper>('bp-number-stepper');
    await elementIsStable(stepper);

    expect(stepper.value).toBe(0);
    expect(stepper.step).toBe(1);
    expect(stepper.continuous).toBe(false);
    expect(stepper.continuousDelay).toBe(500);
    expect(stepper.continuousInterval).toBe(100);

    removeFixture(defaultElement);
  });

  it('should associate input and label', async () => {
    await elementIsStable(element);
    expect(element.id).toBe(label.htmlFor);
    expect(label.htmlFor).toBe(element.id);
    expect(element.id.includes('_')).toBe(true);
  });

  it('should associate message and input', async () => {
    await elementIsStable(element);
    expect(element.id.includes('_')).toBe(true);
    expect(element.getAttribute('aria-describedby')).toBe(message.id);
  });

  it('should increment value when increment button is clicked', async () => {
    await elementIsStable(element);
    const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
    const event = onceEvent(element, 'change');

    emulateClick(incrementButton);
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(6);
    expect(await event).toBeTruthy();
  });

  it('should decrement value when decrement button is clicked', async () => {
    await elementIsStable(element);
    const decrementButton = element.shadowRoot.querySelector('[part="decrement"]') as HTMLElement;
    const event = onceEvent(element, 'change');

    emulateClick(decrementButton);
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(4);
    expect(await event).toBeTruthy();
  });

  it('should respect min value', async () => {
    element.value = 0;
    await elementIsStable(element);

    element.stepDown();
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(0);
  });

  it('should respect max value', async () => {
    element.value = 10;
    await elementIsStable(element);

    element.stepUp();
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(10);
  });

  it('should disable decrement button at min value', async () => {
    element.value = 0;
    await elementIsStable(element);

    const decrementButton = element.shadowRoot.querySelector('[part="decrement"]');
    expect(decrementButton.hasAttribute('disabled')).toBe(true);
  });

  it('should disable increment button at max value', async () => {
    element.value = 10;
    await elementIsStable(element);

    const incrementButton = element.shadowRoot.querySelector('[part="increment"]');
    expect(incrementButton.hasAttribute('disabled')).toBe(true);
  });

  it('should support custom step values', async () => {
    element.step = 5;
    element.value = 0;
    await elementIsStable(element);

    element.stepUp();
    await elementIsStable(element);

    expect(element.value).toBe('5');
    expect(element.valueAsNumber).toBe(5);

    element.stepUp();
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(10);
  });

  it('should support decimal values', async () => {
    element.step = 0.5;
    element.value = 5;
    element.min = 0;
    element.max = 10;
    await elementIsStable(element);

    element.stepUp();
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(5.5);
  });

  it('should support stepUp with multiplier', async () => {
    element.value = 0;
    await elementIsStable(element);

    element.stepUp(3);
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(3);
  });

  it('should support stepDown with multiplier', async () => {
    element.value = 10;
    await elementIsStable(element);

    element.stepDown(3);
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(7);
  });

  // it('should emit change event on increment', async () => {
  //   await elementIsStable(element);
  //   const changeEvent = onceEvent(element, 'change');

  //   element.stepUp();
  //   await elementIsStable(element);

  //   expect(await changeEvent).toBeTruthy();
  // });

  // it('should emit change event on decrement', async () => {
  //   await elementIsStable(element);
  //   const changeEvent = onceEvent(element, 'change');

  //   element.stepDown();
  //   await elementIsStable(element);

  //   expect(await changeEvent).toBeTruthy();
  // });

  it('should handle valueAsNumber getter and setter', async () => {
    element.valueAsNumber = 7;
    await elementIsStable(element);

    expect(element.value).toBe('7');
    expect(element.valueAsNumber).toBe(7);
  });

  it('should disable both buttons when disabled', async () => {
    element.disabled = true;
    await elementIsStable(element);

    const decrementButton = element.shadowRoot.querySelector('[part="decrement"]');
    const incrementButton = element.shadowRoot.querySelector('[part="increment"]');

    expect(decrementButton.hasAttribute('disabled')).toBe(true);
    expect(incrementButton.hasAttribute('disabled')).toBe(true);
  });

  it('should set proper aria attributes', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');

    expect(input.getAttribute('role')).toBe('spinbutton');
    expect(input.getAttribute('aria-valuemin')).toBe('0');
    expect(input.getAttribute('aria-valuemax')).toBe('10');
    expect(input.getAttribute('aria-valuenow')).toBe('5');
  });

  it('should handle readonly state', async () => {
    element.readOnly = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.readOnly).toBe(true);
  });

  it('should support placeholder text', async () => {
    element.placeholder = 'Enter quantity';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.placeholder).toBe('Enter quantity');
  });

  it('should focus input when focus() is called', async () => {
    await elementIsStable(element);
    element.focus();
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(element.shadowRoot.activeElement).toBe(input);
  });

  it('should support required attribute', async () => {
    element.required = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector('input');
    expect(input.required).toBe(true);
  });

  it('should handle negative values', async () => {
    element.min = -10;
    element.max = 10;
    element.value = 0;
    await elementIsStable(element);

    element.stepDown();
    await elementIsStable(element);

    expect(element.valueAsNumber).toBe(-1);
  });

  it('should handle large step increments with clamping', async () => {
    element.value = 8;
    element.step = 5;
    await elementIsStable(element);

    element.stepUp();
    await elementIsStable(element);

    // Should clamp to max value of 10
    expect(element.valueAsNumber).toBe(10);
  });

  it('should emit input event when typing in the input', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('input');
    const inputEvent = onceEvent(element, 'input');

    input.value = '7';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    await elementIsStable(element);

    expect(await inputEvent).toBeTruthy();
  });

  describe('continuous stepping', () => {
    it('should repeat stepping after delay when holding increment button', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 0;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 200));

      expect(element.valueAsNumber).toBeGreaterThan(0);

      incrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    it('should repeat stepping after delay when holding decrement button', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 10;
      await elementIsStable(element);

      const decrementButton = element.shadowRoot.querySelector('[part="decrement"]') as HTMLElement;
      decrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 200));

      expect(element.valueAsNumber).toBeLessThan(10);

      decrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    it('should stop stepping on mouseup', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 0;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 150));

      incrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
      const stoppedValue = element.valueAsNumber;

      await new Promise(r => setTimeout(r, 150));
      expect(element.valueAsNumber).toBe(stoppedValue);
    });

    it('should stop stepping on mouseleave', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 0;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 150));

      incrementButton.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
      const stoppedValue = element.valueAsNumber;

      await new Promise(r => setTimeout(r, 150));
      expect(element.valueAsNumber).toBe(stoppedValue);
    });

    it('should stop at max boundary during continuous increment', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 9;
      element.max = 10;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 400));

      expect(element.valueAsNumber).toBe(10);

      incrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    it('should stop at min boundary during continuous decrement', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 1;
      element.min = 0;
      await elementIsStable(element);

      const decrementButton = element.shadowRoot.querySelector('[part="decrement"]') as HTMLElement;
      decrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 400));

      expect(element.valueAsNumber).toBe(0);

      decrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    it('should not start continuous stepping when disabled', async () => {
      element.continuous = true;
      element.disabled = true;
      element.continuousDelay = 50;
      element.value = 5;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 200));

      expect(element.valueAsNumber).toBe(5);

      incrementButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    it('should clear timers when element is disconnected', async () => {
      element.continuous = true;
      element.continuousDelay = 50;
      element.continuousInterval = 20;
      element.value = 0;
      await elementIsStable(element);

      const incrementButton = element.shadowRoot.querySelector('[part="increment"]') as HTMLElement;
      incrementButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await new Promise(r => setTimeout(r, 150));

      const valueAtDisconnect = element.valueAsNumber;
      element.disconnectedCallback();

      await new Promise(r => setTimeout(r, 150));
      expect(element.valueAsNumber).toBe(valueAtDisconnect);
    });
  });
});
