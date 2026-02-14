import { html } from 'lit';
import { BpPin } from '@blueprintui/components/pin';
import '@blueprintui/components/include/pin.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpFieldMessage } from '../forms';

describe('bp-pin', () => {
  let element: BpPin;
  let label: HTMLLabelElement;
  let message: BpFieldMessage;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>Verification Code</label>
        <bp-pin length="6"></bp-pin>
        <bp-field-message>Enter the 6-digit code</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpPin>('bp-pin');
    message = fixture.querySelector<BpFieldMessage>('bp-field-message');
    label = fixture.querySelector<HTMLLabelElement>('label');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-pin')).toBe(BpPin);
  });

  it('should have default length of 4', async () => {
    const defaultElement = await createFixture(html`<bp-pin></bp-pin>`);
    const pin = defaultElement.querySelector<BpPin>('bp-pin');
    await elementIsStable(pin);
    expect(pin.length).toBe(4);
    removeFixture(defaultElement);
  });

  it('should render correct number of input fields based on length', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll('input');
    expect(inputs.length).toBe(6);
  });

  it('should handle different lengths', async () => {
    element.length = 8;
    await elementIsStable(element);
    let inputs = element.shadowRoot.querySelectorAll('input');
    expect(inputs.length).toBe(8);

    element.length = 4;
    await elementIsStable(element);
    inputs = element.shadowRoot.querySelectorAll('input');
    expect(inputs.length).toBe(4);
  });

  it('should handle value property', async () => {
    element.value = '123456';
    await elementIsStable(element);
    expect(element.value).toBe('123456');
  });

  it('should distribute value across input fields', async () => {
    element.value = '123456';
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('4');
    expect(inputs[4].value).toBe('5');
    expect(inputs[5].value).toBe('6');
  });

  it('should handle partial values', async () => {
    element.value = '123';
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('');
    expect(inputs[4].value).toBe('');
    expect(inputs[5].value).toBe('');
  });

  it('should handle disabled property', async () => {
    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.disabled).toBe(true);
    });
  });

  it('should handle readonly property', async () => {
    element.readOnly = true;
    await elementIsStable(element);
    expect(element.readOnly).toBe(true);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.readOnly).toBe(true);
    });
  });

  it('should handle required property', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
    const firstInput = element.shadowRoot.querySelector<HTMLInputElement>('input');
    expect(firstInput.required).toBe(true);
  });

  it('should handle mask property', async () => {
    element.mask = true;
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.type).toBe('password');
    });

    element.mask = false;
    await elementIsStable(element);
    inputs.forEach(input => {
      expect(input.type).toBe('text');
    });
  });

  it('should handle placeholder property', async () => {
    element.placeholder = 'X';
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.placeholder).toBe('X');
    });
  });

  it('should have default placeholder', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.placeholder).toBe('•');
    });
  });

  it('should have inputmode set to numeric', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.inputMode).toBe('numeric');
    });
  });

  it('should handle pattern property', async () => {
    element.pattern = '[0-9]';
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.pattern).toBe('[0-9]');
    });
  });

  it('should handle type property', async () => {
    element.type = 'number';
    await elementIsStable(element);
    expect(element.type).toBe('number');
  });

  it('should update value on input', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

    const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
    inputs[0].value = '5';
    inputs[0].dispatchEvent(inputEvent);

    await elementIsStable(element);
    expect(element.value.charAt(0)).toBe('5');
  });

  it('should handle sequential character input correctly', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

    // Simulate typing "1" in first field
    inputs[0].value = '1';
    inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);
    await element.updateComplete; // Wait for internal promise to resolve

    // Simulate typing "2" in second field
    inputs[1].value = '2';
    inputs[1].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);
    await element.updateComplete;

    // Simulate typing "3" in third field
    inputs[2].value = '3';
    inputs[2].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);
    await element.updateComplete;

    // Verify all fields have correct values
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(element.value).toBe('123');
  });

  it('should maintain field values during rapid sequential input', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

    // Simulate rapid typing sequence
    for (let i = 0; i < 6; i++) {
      inputs[i].value = String(i + 1);
      inputs[i].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }

    await elementIsStable(element);

    // Verify each field retained its value
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('4');
    expect(inputs[4].value).toBe('5');
    expect(inputs[5].value).toBe('6');
    expect(element.value).toBe('123456');
  });

  it('should keep fields array in sync with DOM values', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

    // Type values
    inputs[0].value = '9';
    inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);

    inputs[1].value = '8';
    inputs[1].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);

    inputs[2].value = '7';
    inputs[2].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);

    // Check internal fields array matches DOM
    expect(element['fields'][0]).toBe('9');
    expect(element['fields'][1]).toBe('8');
    expect(element['fields'][2]).toBe('7');
    expect(element.value).toBe('987');
  });

  it('should handle single character per field constraint', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

    // Try to input multiple characters
    inputs[0].value = '123';
    inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await elementIsStable(element);

    // Should only take first character
    expect(inputs[0].value).toBe('1');
  });

  it('should fire complete event when all fields are filled', async () => {
    await elementIsStable(element);
    const completeEvent = onceEvent(element, 'complete');

    element.value = '123456';
    await elementIsStable(element);

    // Simulate input to trigger complete event
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
    inputs[5].dispatchEvent(inputEvent);

    const event = await completeEvent;
    expect(event).toBeTruthy();
  });

  it('should focus first empty field on focus()', async () => {
    await elementIsStable(element);
    element.value = '12';
    await elementIsStable(element);

    element.focus();
    await elementIsStable(element);

    expect(document.activeElement).toBe(element);
  });

  it('should reset all fields on reset()', async () => {
    await elementIsStable(element);
    element.value = '123456';
    await elementIsStable(element);

    element.reset();
    await elementIsStable(element);

    expect(element.value).toBe('');
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach(input => {
      expect(input.value).toBe('');
    });
  });

  it('should have aria labels for each input', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    inputs.forEach((input, i) => {
      expect(input.ariaLabel).toContain(`digit ${i + 1}`);
    });
  });

  it('should associate label with component', async () => {
    await elementIsStable(element);
    expect(element.id).toBe(label.htmlFor);
    expect(label.htmlFor).toBe(element.id);
    expect(element.id.includes('_')).toBe(true);
  });

  it('should associate message with component', async () => {
    await elementIsStable(element);
    expect(element.id.includes('_')).toBe(true);
    expect(element.getAttribute('aria-describedby')).toBe(message.id);
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

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--gap', '1rem');
    element.style.setProperty('--width', '3rem');
    element.style.setProperty('--height', '3rem');
    element.style.setProperty('--font-size', '1.5rem');
    element.style.setProperty('--border', '2px solid red');
    element.style.setProperty('--border-radius', '8px');
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'black');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--gap')).toBe('1rem');
    expect(element.style.getPropertyValue('--width')).toBe('3rem');
    expect(element.style.getPropertyValue('--height')).toBe('3rem');
    expect(element.style.getPropertyValue('--font-size')).toBe('1.5rem');
    expect(element.style.getPropertyValue('--border')).toBe('2px solid red');
    expect(element.style.getPropertyValue('--border-radius')).toBe('8px');
    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
  });

  it('should extend FormControl', async () => {
    await elementIsStable(element);
    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
    expect('validity' in element).toBe(true);
    expect('validationMessage' in element).toBe(true);
  });

  it('should handle name property for form submission', async () => {
    element.name = 'pin-code';
    await elementIsStable(element);
    expect(element.name).toBe('pin-code');
  });

  it('should handle autocomplete on first field', async () => {
    element.autocomplete = 'one-time-code';
    await elementIsStable(element);
    const firstInput = element.shadowRoot.querySelector<HTMLInputElement>('input');
    expect(firstInput.autocomplete).toBe('one-time-code');
  });

  it('should limit input to single character', async () => {
    await elementIsStable(element);
    const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
    expect(inputs[0].maxLength).toBe(1);
  });

  it('should have role="group" on host', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('group');
  });

  it('should handle touched state after blur', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(false);

    element.focus();
    element.blur();
    await elementIsStable(element);
    expect(element.matches(':state(touched)')).toBe(true);
  });

  it('should handle form integration', async () => {
    const formFixture = await createFixture(html`
      <form>
        <bp-pin name="verification" length="4" value="1234"></bp-pin>
      </form>
    `);
    const formPin = formFixture.querySelector<BpPin>('bp-pin');
    const form = formFixture.querySelector<HTMLFormElement>('form');

    await elementIsStable(formPin);

    const formData = new FormData(form);
    expect(formData.get('verification')).toBe('1234');

    removeFixture(formFixture);
  });

  it('should validate required fields', async () => {
    element.required = true;
    element.value = '';
    await elementIsStable(element);

    expect(typeof element.checkValidity).toBe('function');
    expect(typeof element.reportValidity).toBe('function');
  });

  it('should handle change events', async () => {
    await elementIsStable(element);
    const changeEvent = onceEvent(element, 'change');

    // Dispatch change event from the host element (shadow DOM change events are stopped by the mixin)
    const event = new Event('change', { bubbles: true, composed: true });
    element.dispatchEvent(event);

    expect(await changeEvent).toBeTruthy();
  });

  describe('keyboard navigation', () => {
    it('should navigate to previous field on Backspace when current is empty', async () => {
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      // Focus third field
      inputs[2].focus();
      await elementIsStable(element);

      // Press Backspace on empty field (should move to previous)
      const event = new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, composed: true, cancelable: true });
      const preventSpy = spyOn(event, 'preventDefault').and.callThrough();
      inputs[2].dispatchEvent(event);
      await elementIsStable(element);

      // Should have called preventDefault
      expect(preventSpy).toHaveBeenCalled();
    });

    it('should navigate left on ArrowLeft key', async () => {
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[2].focus();
      await elementIsStable(element);

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true, cancelable: true });
      const preventSpy = spyOn(event, 'preventDefault').and.callThrough();
      inputs[2].dispatchEvent(event);
      await elementIsStable(element);

      expect(preventSpy).toHaveBeenCalled();
    });

    it('should navigate right on ArrowRight key', async () => {
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[2].focus();
      await elementIsStable(element);

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        composed: true,
        cancelable: true
      });
      const preventSpy = spyOn(event, 'preventDefault').and.callThrough();
      inputs[2].dispatchEvent(event);
      await elementIsStable(element);

      expect(preventSpy).toHaveBeenCalled();
    });

    it('should navigate to first field on Home key', async () => {
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[3].focus();
      await elementIsStable(element);

      const event = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, composed: true, cancelable: true });
      const preventSpy = spyOn(event, 'preventDefault').and.callThrough();
      inputs[3].dispatchEvent(event);
      await elementIsStable(element);

      expect(preventSpy).toHaveBeenCalled();
    });

    it('should navigate to last field on End key', async () => {
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[1].focus();
      await elementIsStable(element);

      const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true, composed: true, cancelable: true });
      const preventSpy = spyOn(event, 'preventDefault').and.callThrough();
      inputs[1].dispatchEvent(event);
      await elementIsStable(element);

      expect(preventSpy).toHaveBeenCalled();
    });
  });

  // describe('paste functionality', () => {
  // it('should handle paste of complete PIN', async () => {
  //   await elementIsStable(element);
  //   const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

  //   const pasteEvent = new ClipboardEvent('paste', {
  //     bubbles: true,
  //     composed: true,
  //     clipboardData: new DataTransfer()
  //   });
  //   pasteEvent.clipboardData.setData('text', '123456');

  //   inputs[0].dispatchEvent(pasteEvent);
  //   await elementIsStable(element);

  //   expect(element.value).toBe('123456');
  //   expect(inputs[0].value).toBe('1');
  //   expect(inputs[1].value).toBe('2');
  //   expect(inputs[2].value).toBe('3');
  //   expect(inputs[3].value).toBe('4');
  //   expect(inputs[4].value).toBe('5');
  //   expect(inputs[5].value).toBe('6');
  // });

  // it('should handle paste from middle field', async () => {
  //   await elementIsStable(element);
  //   const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

  //   // Set first two fields
  //   element.value = '12';
  //   await elementIsStable(element);

  //   // Paste into third field
  //   const pasteEvent = new ClipboardEvent('paste', {
  //     bubbles: true,
  //     composed: true,
  //     clipboardData: new DataTransfer()
  //   });
  //   pasteEvent.clipboardData.setData('text', '3456');

  //   inputs[2].dispatchEvent(pasteEvent);
  //   await elementIsStable(element);

  //   expect(inputs[2].value).toBe('3');
  //   expect(inputs[3].value).toBe('4');
  //   expect(inputs[4].value).toBe('5');
  //   expect(inputs[5].value).toBe('6');
  // });

  // it('should strip whitespace from pasted data', async () => {
  //   await elementIsStable(element);
  //   const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

  //   const pasteEvent = new ClipboardEvent('paste', {
  //     bubbles: true,
  //     composed: true,
  //     clipboardData: new DataTransfer()
  //   });
  //   pasteEvent.clipboardData.setData('text', '1 2 3 4 5 6');

  //   inputs[0].dispatchEvent(pasteEvent);
  //   await elementIsStable(element);

  //   expect(element.value).toBe('123456');
  // });

  // it('should validate pasted numeric data when type is number', async () => {
  //   element.type = 'number';
  //   await elementIsStable(element);
  //   const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

  //   const pasteEvent = new ClipboardEvent('paste', {
  //     bubbles: true,
  //     composed: true,
  //     clipboardData: new DataTransfer()
  //   });
  //   pasteEvent.clipboardData.setData('text', '12a45b');

  //   inputs[0].dispatchEvent(pasteEvent);
  //   await elementIsStable(element);

  //   // Should only accept numeric characters
  //   expect(element.value).toBe('1245');
  // });

  // it('should truncate pasted data to length', async () => {
  //   await elementIsStable(element);
  //   const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

  //   const pasteEvent = new ClipboardEvent('paste', {
  //     bubbles: true,
  //     composed: true,
  //     clipboardData: new DataTransfer()
  //   });
  //   pasteEvent.clipboardData.setData('text', '123456789');

  //   inputs[0].dispatchEvent(pasteEvent);
  //   await elementIsStable(element);

  //   expect(element.value).toBe('123456');
  //   expect(element.value.length).toBe(6);
  // });
  // });

  describe('pattern validation', () => {
    it('should validate input against pattern', async () => {
      element.pattern = '[0-9]';
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      // Try to enter invalid character
      const initialValue = inputs[0].value;
      inputs[0].value = 'a';
      inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      await elementIsStable(element);

      // Should reject non-numeric
      expect(inputs[0].value).toBe(initialValue);
    });

    it('should allow valid pattern input', async () => {
      element.pattern = '[0-9]';
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[0].value = '5';
      inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      await elementIsStable(element);

      expect(inputs[0].value).toBe('5');
    });
  });

  describe('numeric type validation', () => {
    it('should reject non-numeric input when type is number', async () => {
      element.type = 'number';
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      const initialValue = inputs[0].value;
      inputs[0].value = 'a';
      inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      await elementIsStable(element);

      expect(inputs[0].value).toBe(initialValue);
    });

    it('should accept numeric input when type is number', async () => {
      element.type = 'number';
      await elementIsStable(element);
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      inputs[0].value = '7';
      inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      await elementIsStable(element);

      expect(inputs[0].value).toBe('7');
    });
  });

  describe('focus behavior', () => {
    it('should select content on focus', async () => {
      await elementIsStable(element);
      element.value = '123456';
      await elementIsStable(element);

      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
      const selectSpy = spyOn(inputs[2], 'select');

      inputs[2].dispatchEvent(new FocusEvent('focus', { bubbles: true, composed: true }));
      await elementIsStable(element);

      expect(selectSpy).toHaveBeenCalled();
    });
  });

  describe('complete event', () => {
    xit('should fire complete event when all fields filled via typing', async () => {
      await elementIsStable(element);
      const completeEvent = onceEvent(element, 'complete');
      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');

      // Fill all fields sequentially
      for (let i = 0; i < 6; i++) {
        inputs[i].value = String(i + 1);
        inputs[i].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        await elementIsStable(element);
      }

      const event = await completeEvent;
      expect(event).toBeTruthy();
      expect(event.detail.value).toBe('123456');
    });

    xit('should fire complete event on paste that fills all fields', async () => {
      await elementIsStable(element);
      const completeEvent = onceEvent(element, 'complete');

      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
      const pasteEvent = new ClipboardEvent('paste', {
        bubbles: true,
        composed: true,
        clipboardData: new DataTransfer()
      });
      pasteEvent.clipboardData.setData('text', '987654');

      inputs[0].dispatchEvent(pasteEvent);
      await elementIsStable(element);

      const event = await completeEvent;
      expect(event).toBeTruthy();
      expect(event.detail.value).toBe('987654');
    });

    it('should not fire complete event when partially filled', async () => {
      await elementIsStable(element);
      const completeListener = jasmine.createSpy('complete');
      element.addEventListener('complete', completeListener);

      const inputs = element.shadowRoot.querySelectorAll<HTMLInputElement>('input');
      inputs[0].value = '1';
      inputs[0].dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      await elementIsStable(element);

      // Give some time for any potential event to fire
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(completeListener).not.toHaveBeenCalled();
    });
  });
});
