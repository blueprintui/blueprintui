import { html } from 'lit';
import { BpNumber } from '@blueprintui/components/number';
import '@blueprintui/components/include/number.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpFieldMessage } from '../forms';

describe('bp-number', () => {
  let element: BpNumber;
  let label: HTMLLabelElement;
  let message: BpFieldMessage;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>number</label>
        <bp-number></bp-number>
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpNumber>('bp-number');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-number')).toBe(BpNumber);
  });

  it('should default type to number', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('number');
  });

  it('should handle value property as string', async () => {
    element.value = '42';
    await elementIsStable(element);
    expect(element.value).toBe('42');
  });

  it('should handle valueAsNumber property', async () => {
    element.value = '42.5';
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(42.5);

    element.valueAsNumber = 99;
    await elementIsStable(element);
    expect(element.value).toBe('99');
    expect(element.valueAsNumber).toBe(99);
  });

  it('should handle min property', async () => {
    element.min = 0;
    await elementIsStable(element);
    expect(element.min).toBe(0);
  });

  it('should handle max property', async () => {
    element.max = 100;
    await elementIsStable(element);
    expect(element.max).toBe(100);
  });

  it('should handle step property', async () => {
    element.step = 5;
    await elementIsStable(element);
    expect(element.step).toBe(5);
  });

  it('should validate min range constraint', async () => {
    element.min = 10;
    element.value = '5';
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);
    element.checkValidity();
    await elementIsStable(element);

    expect(element.validity.rangeUnderflow).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should validate max range constraint', async () => {
    element.max = 100;
    element.value = '150';
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);

    expect(element.validity.rangeOverflow).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should validate step constraint', async () => {
    element.min = 0;
    element.step = 10;
    element.value = '15';
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);

    expect(element.validity.stepMismatch).toBe(true);
    expect(element.validity.valid).toBe(false);
  });

  it('should pass validation when value is within constraints', async () => {
    element.min = 0;
    element.max = 100;
    element.step = 5;
    element.value = '50';
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(true);
  });

  it('should handle required validation', async () => {
    element.required = true;
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);

    expect(element.validity.valueMissing).toBe(true);
    expect(element.validity.valid).toBe(false);

    element.value = '42';
    await elementIsStable(element);
    element.checkValidity();
    await elementIsStable(element);
    expect(element.validity.valueMissing).toBe(false);
  });

  it('should handle stepUp method', async () => {
    element.value = '10';
    element.step = 5;
    await elementIsStable(element);

    element.stepUp();
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(15);

    element.stepUp(2);
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(25);
  });

  it('should handle stepDown method', async () => {
    element.value = '25';
    element.step = 5;
    await elementIsStable(element);

    element.stepDown();
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(20);

    element.stepDown(2);
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(10);
  });

  it('should handle placeholder property', async () => {
    element.placeholder = 'Enter number';
    await elementIsStable(element);
    expect(element.placeholder).toBe('Enter number');
  });

  it('should handle readonly property', async () => {
    element.readonly = true;
    await elementIsStable(element);
    expect(element.matches(':state(readonly)')).toBe(true);
  });

  it('should handle disabled property', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);
  });

  it('should apply invalid styles when state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
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

  it('should allow change events dispatched by component', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'change');

    (element as any).onChange(
      { target: { value: '42', valueAsNumber: 42 }, preventDefault, stopPropagation },
      { valueType: 'number' }
    );

    expect(element.valueAsNumber).toBe(42);
    expect(await event).toBeTruthy();
  });

  it('should allow input events dispatched by component', async () => {
    await elementIsStable(element);
    const preventDefault = () => {
      return;
    };
    const stopPropagation = () => {
      return;
    };
    const event = onceEvent(element, 'input');

    (element as any).onInput(
      { target: { value: '42', valueAsNumber: 42 }, data: '42', preventDefault, stopPropagation },
      { valueType: 'number' }
    );

    expect(element.valueAsNumber).toBe(42);
    expect((await event).data).toBe('42');
  });

  it('should support prefix slot', async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>price</label>
        <bp-number>
          <span slot="prefix">$</span>
        </bp-number>
      </bp-field>
    `);
    element = fixture.querySelector<BpNumber>('bp-number');
    await elementIsStable(element);

    const prefix = element.querySelector('[slot="prefix"]');
    expect(prefix).toBeTruthy();
    expect(prefix?.textContent).toBe('$');
  });

  it('should support suffix slot', async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>weight</label>
        <bp-number>
          <span slot="suffix">lbs</span>
        </bp-number>
      </bp-field>
    `);
    element = fixture.querySelector<BpNumber>('bp-number');
    await elementIsStable(element);

    const suffix = element.querySelector('[slot="suffix"]');
    expect(suffix).toBeTruthy();
    expect(suffix?.textContent).toBe('lbs');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'blue');
    element.style.setProperty('--border', '1px solid gray');
    element.style.setProperty('--border-radius', '4px');
    element.style.setProperty('--outline', '2px solid blue');
    element.style.setProperty('--outline-offset', '2px');
    element.style.setProperty('--padding', '8px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--line-height', '1.4');
    element.style.setProperty('--height', '40px');
    element.style.setProperty('--min-width', '100px');
    element.style.setProperty('--width', '300px');
    element.style.setProperty('--transition', 'all 0.2s');
    element.style.setProperty('--text-align', 'right');
    element.style.setProperty('--cursor', 'text');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('blue');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid gray');
    expect(element.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(element.style.getPropertyValue('--outline')).toBe('2px solid blue');
    expect(element.style.getPropertyValue('--outline-offset')).toBe('2px');
    expect(element.style.getPropertyValue('--padding')).toBe('8px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--line-height')).toBe('1.4');
    expect(element.style.getPropertyValue('--height')).toBe('40px');
    expect(element.style.getPropertyValue('--min-width')).toBe('100px');
    expect(element.style.getPropertyValue('--width')).toBe('300px');
    expect(element.style.getPropertyValue('--transition')).toBe('all 0.2s');
    expect(element.style.getPropertyValue('--text-align')).toBe('right');
    expect(element.style.getPropertyValue('--cursor')).toBe('text');
  });

  it('should handle focus and blur events', async () => {
    await elementIsStable(element);

    element.focus();
    expect(document.activeElement).toBe(element);

    element.blur();
    expect(document.activeElement).not.toBe(element);
  });

  it('should handle touched state after blur', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should extend FormControl', async () => {
    await elementIsStable(element);
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
    expect('validationMessage' in element).toBe(true);
  });

  it('should handle name property for form submission', async () => {
    element.name = 'quantity';
    await elementIsStable(element);
    expect(element.name).toBe('quantity');
  });

  it('should handle autocomplete property', async () => {
    element.autocomplete = 'off';
    await elementIsStable(element);
    expect(element.autocomplete).toBe('off');
  });

  it('should handle formNoValidate property', async () => {
    element.formNoValidate = true;
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(true);
  });

  it('should handle decimal values', async () => {
    element.step = 0.01;
    element.value = '42.99';
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(42.99);
  });

  it('should have input element reference', async () => {
    await elementIsStable(element);
    const input = (element as any).input;
    expect(input).toBeTruthy();
    expect(input.tagName).toBe('INPUT');
    expect(input.type).toBe('number');
  });

  it('should handle negative numbers', async () => {
    element.value = '-50';
    await elementIsStable(element);
    expect(element.valueAsNumber).toBe(-50);
  });

  it('should validate negative range', async () => {
    element.min = -100;
    element.max = -10;
    element.value = '-50';
    await elementIsStable(element);

    element.focus();
    element.blur();
    await elementIsStable(element);

    expect(element.validity.valid).toBe(true);
  });
});
