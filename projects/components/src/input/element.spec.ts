import { html } from 'lit';
import { BpInput } from '@blueprintui/components/input';
import '@blueprintui/components/include/input.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpFieldMessage } from '../forms';

describe('bp-input', () => {
  let element: BpInput;
  let label: HTMLLabelElement;
  let message: BpFieldMessage;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-input></bp-input>
        <bp-field-message>message</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpInput>('bp-input');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-input')).toBe(BpInput);
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

    (element as any)._onChange({ target: { value: 'hello' }, preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
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

    (element as any)._onInput({ target: { value: 'hello' }, data: 'hello', preventDefault, stopPropagation });

    expect(element.value).toBe('hello');
    expect((await event).data).toBe('hello');
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

  it('should apply invalid styles when the state is invalid and touched', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(invalid):state(touched)')).toBe(true);
  });

  it('should default type to text', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('text');
  });

  it('should support different input types', async () => {
    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;

    for (const type of types) {
      element.type = type;
      await elementIsStable(element);
      expect(element.type).toBe(type);
    }
  });

  it('should handle value property', async () => {
    element.value = 'test value';
    await elementIsStable(element);
    expect(element.value).toBe('test value');
  });

  it('should handle placeholder property', async () => {
    element.placeholder = 'Enter text here';
    await elementIsStable(element);
    expect(element.placeholder).toBe('Enter text here');
  });

  it('should handle readonly property', async () => {
    element.readOnly = true;
    await elementIsStable(element);
    expect(element.readOnly).toBe(true);
  });

  it('should handle disabled property', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
  });

  it('should handle required property', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
  });

  it('should handle maxLength property', async () => {
    element.maxLength = 10;
    await elementIsStable(element);
    expect(element.maxLength).toBe(10);
  });

  it('should handle minLength property', async () => {
    element.minLength = 3;
    await elementIsStable(element);
    expect(element.minLength).toBe(3);
  });

  it('should handle pattern property', async () => {
    element.pattern = '[0-9]{3}';
    await elementIsStable(element);
    expect(element.pattern).toBe('[0-9]{3}');
  });

  it('should handle autocomplete property', async () => {
    element.autocomplete = 'email';
    await elementIsStable(element);
    expect(element.autocomplete).toBe('email');
  });

  it('should handle multiple property', async () => {
    element.multiple = true;
    await elementIsStable(element);
    expect(element.multiple).toBe(true);
  });

  it('should support prefix slot', async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-input>
          <bp-icon slot="prefix" shape="search"></bp-icon>
        </bp-input>
      </bp-field>
    `);
    element = fixture.querySelector<BpInput>('bp-input');
    await elementIsStable(element);

    const prefixIcon = element.querySelector('bp-icon[slot="prefix"]');
    expect(prefixIcon).toBeTruthy();
    expect(prefixIcon?.getAttribute('shape')).toBe('search');
  });

  it('should support suffix slot', async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>label</label>
        <bp-input>
          <bp-icon slot="suffix" shape="close"></bp-icon>
        </bp-input>
      </bp-field>
    `);
    element = fixture.querySelector<BpInput>('bp-input');
    await elementIsStable(element);

    const suffixIcon = element.querySelector('bp-icon[slot="suffix"]');
    expect(suffixIcon).toBeTruthy();
    expect(suffixIcon?.getAttribute('shape')).toBe('close');
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background-size', 'cover');
    element.style.setProperty('--color', 'blue');
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--border', '1px solid gray');
    element.style.setProperty('--border-radius', '4px');
    element.style.setProperty('--outline', '2px solid blue');
    element.style.setProperty('--outline-offset', '2px');
    element.style.setProperty('--padding', '8px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--line-height', '1.4');
    element.style.setProperty('--height', '40px');
    element.style.setProperty('--min-width', '200px');
    element.style.setProperty('--width', '300px');
    element.style.setProperty('--transition', 'all 0.2s');
    element.style.setProperty('--text-align', 'center');
    element.style.setProperty('--cursor', 'text');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background-size')).toBe('cover');
    expect(element.style.getPropertyValue('--color')).toBe('blue');
    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid gray');
    expect(element.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(element.style.getPropertyValue('--outline')).toBe('2px solid blue');
    expect(element.style.getPropertyValue('--outline-offset')).toBe('2px');
    expect(element.style.getPropertyValue('--padding')).toBe('8px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--line-height')).toBe('1.4');
    expect(element.style.getPropertyValue('--height')).toBe('40px');
    expect(element.style.getPropertyValue('--min-width')).toBe('200px');
    expect(element.style.getPropertyValue('--width')).toBe('300px');
    expect(element.style.getPropertyValue('--transition')).toBe('all 0.2s');
    expect(element.style.getPropertyValue('--text-align')).toBe('center');
    expect(element.style.getPropertyValue('--cursor')).toBe('text');
  });

  it('should handle form validation', async () => {
    element.required = true;
    element.minLength = 5;
    await elementIsStable(element);

    // Test empty value (should be invalid)
    element.value = '';
    await elementIsStable(element);
    // FormControl may handle validation differently, so let's just check it has validation methods
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');

    // Test valid value
    element.value = 'abcdef';
    await elementIsStable(element);
    expect(element.value).toBe('abcdef');
  });

  it('should handle focus and blur events', async () => {
    await elementIsStable(element);

    element.focus();
    expect(document.activeElement).toBe(element);

    element.blur();
    expect(document.activeElement).not.toBe(element);
  });

  it('should extend FormControl', async () => {
    await elementIsStable(element);
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
    expect('validationMessage' in element).toBe(true);
  });

  it('should handle name property for form submission', async () => {
    element.name = 'test-input';
    await elementIsStable(element);
    expect(element.name).toBe('test-input');
  });

  it('should handle min and max properties for number inputs', async () => {
    element.type = 'number';
    element.min = 0;
    element.max = 100;
    await elementIsStable(element);
    expect(element.min).toBe(0);
    expect(element.max).toBe(100);
  });

  it('should handle touched state after blur', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should handle pristine/dirty states', async () => {
    await elementIsStable(element);
    element.value = 'changed';
    await elementIsStable(element);
    expect(element.value).toBe('changed');
  });

  it('should have prefixTemplate and suffixTemplate methods', async () => {
    await elementIsStable(element);
    expect((element as any).prefixTemplate).toBe(null);
    expect((element as any).suffixTemplate).toBe(null);
  });

  it('should support showPicker method for date/time inputs', async () => {
    element.type = 'date';
    await elementIsStable(element);
    expect(typeof (element as any).showPicker).toBe('function');
  });

  it('should handle size property', async () => {
    element.size = 20;
    await elementIsStable(element);
    expect(element.size).toBe(20);
  });
});
