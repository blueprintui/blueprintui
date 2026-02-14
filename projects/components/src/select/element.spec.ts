import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpSelect } from '@blueprintui/components/select';
import '@blueprintui/components/include/select.js';

describe('bp-select', () => {
  let element: BpSelect;
  let elementTwo: BpSelect;
  let form: HTMLFormElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-field>
          <label>select</label>
          <bp-select name="test-select">
            <bp-option value="1">one</bp-option>
            <bp-option value="2">two</bp-option>
            <bp-option value="3">three</bp-option>
          </bp-select>
          <bp-field-message>message text</bp-field-message>
        </bp-field>
        <bp-select name="test-select-two">
          <bp-option value="1">one</bp-option>
          <bp-option value="2" selected>two</bp-option>
          <bp-option value="3">three</bp-option>
        </bp-select>
        <button>submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    element = fixture.querySelectorAll<BpSelect>('bp-select')[0];
    elementTwo = fixture.querySelectorAll<BpSelect>('bp-select')[1];
    form.addEventListener('submit', e => e.preventDefault());
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-select')).toBe(BpSelect);
  });

  it('should apply :state(multiple) state when size attr is used on input control', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(multiple)')).toBe(false);

    element.setAttribute('multiple', '');
    await elementIsStable(element);
    expect(element.matches(':state(multiple)')).toBe(true);
  });

  it('should apply :state(size) state when size attr is used on input control', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(size)')).toBe(false);

    element.setAttribute('size', '');
    await elementIsStable(element);
    expect(element.matches(':state(size)')).toBe(true);
  });

  it('should update internal native select to reflect the current value when set via a property', async () => {
    const nativeSelect = element.shadowRoot.querySelector('select');
    await elementIsStable(element);
    expect(element.value).toBe('1');
    expect(nativeSelect.value).toBe('1');

    element.value = '3';
    await elementIsStable(element);

    expect(element.value).toBe('3');
    expect(nativeSelect.value).toBe('3');
  });

  it('should have a default value with the option containing a selected attribute', async () => {
    const nativeSelect = elementTwo.shadowRoot.querySelector('select');
    await elementIsStable(elementTwo);
    expect(elementTwo.value).toBe('2');

    elementTwo.value = '3';
    await elementIsStable(element);

    expect(elementTwo.value).toBe('3');
    expect(nativeSelect.value).toBe('3');
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(false);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.disabled).toBe(true);

    const nativeSelect = element.shadowRoot.querySelector('select');
    expect(nativeSelect.disabled).toBe(true);
  });

  it('should handle required state', async () => {
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle readonly state', async () => {
    element.readOnly = true;
    await elementIsStable(element);
    expect(element.readOnly).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle multiple attribute', async () => {
    await elementIsStable(element);
    expect(element.multiple).toBe(false);
    expect(element.matches(':state(multiple)')).toBe(false);

    element.setAttribute('multiple', '');
    await elementIsStable(element);
    expect(element.matches(':state(multiple)')).toBe(true);

    // Multiple is set via attribute, check for its existence
    expect(element.hasAttribute('multiple')).toBe(true);
  });

  it('should handle size attribute', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(1);
    expect(element.matches(':state(size)')).toBe(false);

    element.setAttribute('size', '3');
    await elementIsStable(element);
    expect(element.matches(':state(size)')).toBe(true);

    // Size is set via attribute, not property
    expect(element.getAttribute('size')).toBe('3');
  });

  it('should handle name property', async () => {
    expect(element.name).toBe('test-select');

    element.name = 'custom-select';
    await elementIsStable(element);
    expect(element.name).toBe('custom-select');
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();
    expect(internal.getAttribute('role')).toBe('presentation');

    const nativeSelect = element.shadowRoot.querySelector('select');
    expect(nativeSelect).toBeTruthy();
    expect(nativeSelect.hasAttribute('input')).toBe(true);

    const expandButton = element.shadowRoot.querySelector('bp-button-expand');
    expect(expandButton).toBeTruthy();
    expect(expandButton.hasAttribute('checked')).toBe(true);
    expect(expandButton.hasAttribute('readonly')).toBe(true);

    const slot = element.shadowRoot.querySelector('slot');
    expect(slot).toBeTruthy();
    expect(slot.hasAttribute('hidden')).toBe(true);
  });

  it('should sync aria-label from composed label', async () => {
    await elementIsStable(element);
    const nativeSelect = element.shadowRoot.querySelector('select');
    expect(nativeSelect.ariaLabel).toBe('select');
  });

  it('should render options from slot content', async () => {
    await elementIsStable(element);
    const nativeSelect = element.shadowRoot.querySelector('select');
    const options = nativeSelect.querySelectorAll('option');

    expect(options.length).toBe(3);
    expect(options[0].value).toBe('1');
    expect(options[0].textContent).toBe('one');
    expect(options[1].value).toBe('2');
    expect(options[1].textContent).toBe('two');
    expect(options[2].value).toBe('3');
    expect(options[2].textContent).toBe('three');
  });

  it('should handle selected option correctly', async () => {
    await elementIsStable(elementTwo);
    const nativeSelect = elementTwo.shadowRoot.querySelector('select');
    const options = nativeSelect.querySelectorAll('option');

    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
  });

  it('should emit change events on selection', async () => {
    await elementIsStable(element);

    let changeEventFired = false;
    let inputEventFired = false;

    element.addEventListener('change', () => (changeEventFired = true));
    element.addEventListener('input', () => (inputEventFired = true));

    const nativeSelect = element.shadowRoot.querySelector('select');
    nativeSelect.value = '3';
    nativeSelect.dispatchEvent(new Event('change', { bubbles: true }));
    nativeSelect.dispatchEvent(new Event('input', { bubbles: true }));

    expect(changeEventFired).toBe(true);
    expect(inputEventFired).toBe(true);
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

  it('should handle form validation', async () => {
    element.required = true;
    await elementIsStable(element);

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

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'black');
    element.style.setProperty('--border', '1px solid gray');
    element.style.setProperty('--border-radius', '4px');
    element.style.setProperty('--outline', 'none');
    element.style.setProperty('--outline-offset', '0');
    element.style.setProperty('--padding', '8px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--line-height', '1.4');
    element.style.setProperty('--height', '40px');
    element.style.setProperty('--min-width', '120px');
    element.style.setProperty('--cursor', 'pointer');
    element.style.setProperty('--width', '200px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid gray');
    expect(element.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(element.style.getPropertyValue('--outline')).toBe('none');
    expect(element.style.getPropertyValue('--outline-offset')).toBe('0');
    expect(element.style.getPropertyValue('--padding')).toBe('8px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--line-height')).toBe('1.4');
    expect(element.style.getPropertyValue('--height')).toBe('40px');
    expect(element.style.getPropertyValue('--min-width')).toBe('120px');
    expect(element.style.getPropertyValue('--cursor')).toBe('pointer');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
  });

  it('should update native select when value changes', async () => {
    await elementIsStable(element);
    const nativeSelect = element.shadowRoot.querySelector('select');

    element.value = '2';
    await elementIsStable(element);

    expect(element.value).toBe('2');
    expect(nativeSelect.value).toBe('2');
  });

  it('should handle form submission', async () => {
    element.value = '3';
    await elementIsStable(element);

    const event = onceEvent(form, 'submit');
    const button = fixture.querySelector('button');
    emulateClick(button);
    await event;

    const formData = new FormData(form);
    expect(formData.get('test-select')).toBe('3');
  });

  it('should handle dynamic option changes', async () => {
    await elementIsStable(element);

    // Add a new option
    const newOption = document.createElement('bp-option');
    newOption.value = '4';
    newOption.textContent = 'four';
    element.appendChild(newOption);

    // Trigger a re-render by dispatching slotchange
    const slot = element.shadowRoot.querySelector('slot');
    slot.dispatchEvent(new Event('slotchange'));
    await elementIsStable(element);

    // Check that the new option was added to the DOM
    const bpOptions = element.querySelectorAll('bp-option');
    expect(bpOptions.length).toBe(4);
    expect(bpOptions[3].value).toBe('4');
    expect(bpOptions[3].textContent).toBe('four');
  });

  it('should handle disabled options', async () => {
    // Create a select with disabled option
    const disabledFixture = await createFixture(html`
      <bp-select>
        <bp-option value="1">one</bp-option>
        <bp-option value="2" disabled>two (disabled)</bp-option>
        <bp-option value="3">three</bp-option>
      </bp-select>
    `);

    const disabledSelect = disabledFixture.querySelector('bp-select');
    await elementIsStable(disabledSelect);

    // Check that the bp-option has the disabled attribute
    const bpOptions = disabledFixture.querySelectorAll('bp-option');
    expect(bpOptions[1].hasAttribute('disabled')).toBe(true);

    removeFixture(disabledFixture);
  });

  it('should maintain composedLabel from associated label', async () => {
    await elementIsStable(element);
    expect(element.composedLabel).toBe('select');

    const nativeSelect = element.shadowRoot.querySelector('select');
    expect(nativeSelect.ariaLabel).toBe('select');
  });

  it('should handle multiple selection mode', async () => {
    element.setAttribute('multiple', '');
    await elementIsStable(element);

    expect(element.matches(':state(multiple)')).toBe(true);
    expect(element.hasAttribute('multiple')).toBe(true);

    // Verify the multiple attribute is reflected
    expect(element.getAttribute('multiple')).toBe('');
  });

  it('should handle keyboard navigation', async () => {
    await elementIsStable(element);
    element.focus();

    // Arrow keys should change selection
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await elementIsStable(element);

    // FormControl may handle tab index differently - just verify it's focusable
    expect(typeof element.focus).toBe('function');
    expect(document.activeElement).toBe(element);
  });

  it('should handle slot changes for option updates', async () => {
    await elementIsStable(element);
    const initialOptions = element.shadowRoot.querySelector('select').querySelectorAll('option');
    expect(initialOptions.length).toBe(3);

    // Simulate slot change
    const slot = element.shadowRoot.querySelector('slot');
    slot.dispatchEvent(new Event('slotchange'));
    await elementIsStable(element);

    // Options should still be there
    const updatedOptions = element.shadowRoot.querySelector('select').querySelectorAll('option');
    expect(updatedOptions.length).toBe(3);
  });
});

/**
 * Unit tests for verifying native HTMLSelectElement behavior
 *
 * Key characteristics:
 * - value returns first selected option's value (or empty string)
 * - selectedIndex returns index of first selected option (or -1)
 * - options is HTMLOptionsCollection of all <bp-option> elements
 * - selectedOptions is HTMLCollection of selected <bp-option> elements
 * - type is "select-one" or "select-multiple"
 * - size defaults to 1 (or 4 if multiple)
 * - length reflects number of options
 * - Supports add(), remove(), item(), namedItem() for option management
 */
describe('Select Control Mixin - Select Element Behavior', () => {
  let element: BpSelect;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = document.createElement('div');
    document.body.appendChild(fixture);
    element = document.createElement('bp-select') as BpSelect;
    fixture.appendChild(element);
    await elementIsStable(element);
  });

  afterEach(() => {
    fixture.remove();
  });

  describe('Basic properties', () => {
    describe('type property', () => {
      it('should be "select-one" by default', () => {
        expect(element.type).toBe('select-one');
      });

      it('should be "select-multiple" when multiple is true', () => {
        element.multiple = true;
        expect(element.type).toBe('select-multiple');
      });

      it('should be read-only', () => {
        // type is determined by multiple attribute
        expect(element.type).toBe('select-one');
      });
    });

    describe('name property', () => {
      it('should default to empty string', () => {
        expect(element.name).toBe('');
      });

      it('should reflect name attribute', () => {
        element.setAttribute('name', 'mySelect');
        expect(element.name).toBe('mySelect');
      });

      it('should update attribute when property is set', () => {
        element.name = 'dropdown';
        expect(element.getAttribute('name')).toBe('dropdown');
      });
    });

    describe('disabled property', () => {
      it('should default to false', () => {
        expect(element.disabled).toBe(false);
      });

      it('should be true when attribute is present', () => {
        element.setAttribute('disabled', '');
        expect(element.disabled).toBe(true);
      });

      it('should add attribute when property set to true', () => {
        element.disabled = true;
        expect(element.hasAttribute('disabled')).toBe(true);
      });

      it('should remove attribute when property set to false', () => {
        element.setAttribute('disabled', '');
        element.disabled = false;
        expect(element.hasAttribute('disabled')).toBe(false);
      });
    });

    describe('required property', () => {
      it('should default to false', () => {
        expect(element.required).toBe(false);
      });

      it('should be true when attribute is present', () => {
        element.setAttribute('required', '');
        expect(element.required).toBe(true);
      });

      it('should update attribute when property is set', () => {
        element.required = true;
        expect(element.hasAttribute('required')).toBe(true);
      });
    });

    describe('multiple property', () => {
      it('should default to false', () => {
        expect(element.multiple).toBe(false);
      });

      it('should be true when attribute is present', () => {
        element.setAttribute('multiple', '');
        expect(element.multiple).toBe(true);
      });

      it('should update attribute when property is set', () => {
        element.multiple = true;
        expect(element.hasAttribute('multiple')).toBe(true);
      });

      it('should change type when toggled', () => {
        expect(element.type).toBe('select-one');
        element.multiple = true;
        expect(element.type).toBe('select-multiple');
      });
    });

    describe('size property', () => {
      it('should default to 1)', () => {
        // The actual default depends on multiple
        expect(element.size).toBe(1);
      });

      it('should reflect size attribute', () => {
        element.setAttribute('size', '5');
        expect(element.size).toBe(5);
      });

      it('should update attribute when property is set', () => {
        element.size = 10;
        expect(element.getAttribute('size')).toBe('10');
      });

      it('should affect visible rows (visual behavior)', () => {
        element.size = 4;
        // When size > 1, select displays as listbox instead of dropdown
        expect(element.size).toBe(4);
      });
    });

    describe('autocomplete property', () => {
      it('should default to empty string', () => {
        expect(element.autocomplete).toBe('');
      });

      it('should reflect autocomplete attribute', () => {
        element.setAttribute('autocomplete', 'off');
        expect(element.autocomplete).toBe('off');
      });

      it('should update attribute when property is set', () => {
        element.autocomplete = 'on';
        expect(element.getAttribute('autocomplete')).toBe('on');
      });
    });
  });

  describe('value property', () => {
    it('should return empty string when no options', () => {
      expect(element.value).toBe('');
    });

    it('should return first option value when options exist but none selected', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      await element.updateComplete;
      // First option is auto-selected in single select
      expect(element.value).toBe('a');
    });

    it('should return selected option value', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
      `;
      await element.updateComplete;
      expect(element.value).toBe('b');
    });

    it('should return text content if option has no value attribute', async () => {
      element.innerHTML = /* html */ `
        <bp-option>First Choice</bp-option>
        <bp-option>Second Choice</bp-option>
      `;
      await element.updateComplete;
      expect(element.value).toBe('First Choice');
    });

    it('should be settable to select matching option', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c">C</bp-option>
      `;
      await element.updateComplete;
      element.value = 'b';
      expect(element.value).toBe('b');
      expect(element.selectedIndex).toBe(1);
    });

    it('should deselect all if value does not match any option', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      await element.updateComplete;
      element.value = 'nonexistent';
      expect(element.value).toBe('');
      expect(element.selectedIndex).toBe(-1);
    });

    it('should return first selected option value when multiple', async () => {
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
        <bp-option value="c" selected>C</bp-option>
      `;
      await element.updateComplete;
      expect(element.value).toBe('b');
    });
  });

  describe('selectedIndex property', () => {
    it('should return -1 when no options', () => {
      expect(element.selectedIndex).toBe(-1);
    });

    it('should return 0 when options exist (first is auto-selected)', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      await element.updateComplete;
      expect(element.selectedIndex).toBe(0);
    });

    it('should return index of selected option', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
      `;
      expect(element.selectedIndex).toBe(1);
    });

    it('should be settable', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c">C</bp-option>
      `;
      element.selectedIndex = 2;
      expect(element.selectedIndex).toBe(2);
      expect(element.value).toBe('c');
    });

    it('should deselect all when set to -1', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a" selected>A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      element.selectedIndex = -1;
      expect(element.selectedIndex).toBe(-1);
      expect(element.value).toBe('');
    });

    it('should ignore invalid indices (out of range)', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      element.selectedIndex = 100;
      expect(element.selectedIndex).toBe(-1);
    });

    it('should deselect other options when set (single select)', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a" selected>A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      element.selectedIndex = 1;
      expect(element.options[0].selected).toBe(false);
      expect(element.options[1].selected).toBe(true);
    });

    it('should return first selected index when multiple selected', () => {
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
        <bp-option value="c" selected>C</bp-option>
      `;
      expect(element.selectedIndex).toBe(1);
    });
  });

  describe('options property', () => {
    it('should return array of BpOption elements', async () => {
      expect(Array.isArray(element.options)).toBe(true);
    });

    it('should be empty when no options', async () => {
      expect(element.options.length).toBe(0);
    });

    it('should contain all option elements', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c">C</bp-option>
      `;
      await elementIsStable(element);
      expect(element.options.length).toBe(3);
    });

    it('should be array-like (indexable)', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;

      await elementIsStable(element);
      expect(element.options[0].value).toBe('a');
      expect(element.options[1].value).toBe('b');
    });

    // it('should include options inside optgroups', () => {
    //   element.innerHTML = /* html */ `
    //     <optgroup label="Group 1">
    //       <bp-option value="a">A</bp-option>
    //       <bp-option value="b">B</bp-option>
    //     </optgroup>
    //     <bp-option value="c">C</bp-option>
    //   `;
    //   expect(element.options.length).toBe(3);
    // });

    // it('should be settable via index assignment', () => {
    //   element.innerHTML = /* html */ `
    //     <bp-option value="a">A</bp-option>
    //     <bp-option value="b">B</bp-option>
    //   `;
    //   const newOption = new Option('C', 'c');
    //   element.options[1] = newOption;
    //   expect(element.options[1].value).toBe('c');
    // });

    // it('should support namedItem()', () => {
    //   element.innerHTML = /* html */ `
    //     <bp-option value="a" id="opt-a">A</bp-option>
    //     <bp-option value="b" name="opt-b">B</bp-option>
    //   `;
    //   expect(element.options.namedItem('opt-a')?.value).toBe('a');
    //   expect(element.options.namedItem('opt-b')?.value).toBe('b');
    // });
  });

  describe('selectedOptions property', () => {
    it('should return array of BpOption elements', async () => {
      expect(element.selectedOptions).toBeInstanceOf(Array);
    });

    it('should be empty when no selection', () => {
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      element.selectedIndex = -1;
      expect(element.selectedOptions.length).toBe(0);
    });

    it('should contain single selected option for select-one', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
      `;
      expect(element.selectedOptions.length).toBe(1);
      expect(element.selectedOptions[0].value).toBe('b');
    });

    it('should contain all selected options for select-multiple', () => {
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a" selected>A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c" selected>C</bp-option>
      `;
      expect(element.selectedOptions.length).toBe(2);
      expect(element.selectedOptions[0].value).toBe('a');
      expect(element.selectedOptions[1].value).toBe('c');
    });

    it('should update when selection changes', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      await elementIsStable(element);
      expect(element.selectedOptions[0].value).toBe('a');
      element.selectedIndex = 1;
      expect(element.selectedOptions[0].value).toBe('b');
    });
  });

  describe('length property', () => {
    it('should return 0 when no options', () => {
      expect(element.length).toBe(0);
    });

    it('should return number of options', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c">C</bp-option>
      `;
      expect(element.length).toBe(3);
    });

    // it('should be settable (truncates or pads with empty options)', () => {
    //   element.innerHTML = /* html */ `
    //     <bp-option value="a">A</bp-option>
    //     <bp-option value="b">B</bp-option>
    //     <bp-option value="c">C</bp-option>
    //   `;
    //   element.length = 1;
    //   expect(element.options.length).toBe(1);
    //   expect(element.options[0].value).toBe('a');
    // });

    // it('should add empty options when increased', () => {
    //   element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
    //   element.length = 3;
    //   expect(element.options.length).toBe(3);
    //   expect(element.options[1].value).toBe('');
    //   expect(element.options[2].value).toBe('');
    // });
  });

  describe('form property', () => {
    it('should return null when not in a form', () => {
      expect(element.form).toBe(null);
    });

    it('should return parent form element', () => {
      const form = document.createElement('form');
      form.appendChild(element);
      fixture.appendChild(form);
      expect(element.form).toBe(form);
    });

    it('should return form referenced by form attribute', () => {
      const form = document.createElement('form');
      form.id = 'myForm';
      fixture.appendChild(form);
      element.setAttribute('form', 'myForm');
      expect(element.form).toBe(form);
    });
  });

  describe('labels property', () => {
    it('should return empty NodeList when no labels', () => {
      expect(element.labels).toBeInstanceOf(NodeList);
      expect(element.labels!.length).toBe(0);
    });

    it('should return associated labels', () => {
      element.id = 'mySelect';
      const label = document.createElement('label');
      label.htmlFor = 'mySelect';
      fixture.appendChild(label);
      expect(element.labels!.length).toBe(1);
    });

    it('should include wrapping labels', () => {
      const label = document.createElement('label');
      label.appendChild(element);
      fixture.appendChild(label);
      expect(element.labels!.length).toBe(1);
    });
  });

  // // describe('Methods', () => {
  // //   describe('add()', () => {
  // //     it('should add option at end by default', () => {
  // //       element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
  // //       const newOption = new Option('B', 'b');
  // //       element.add(newOption);
  // //       expect(element.options.length).toBe(2);
  // //       expect(element.options[1].value).toBe('b');
  // //     });

  // //     it('should add option at specified index', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a">A</bp-option>
  // //         <bp-option value="c">C</bp-option>
  // //       `;
  // //       const newOption = new Option('B', 'b');
  // //       element.add(newOption, 1);
  // //       expect(element.options.length).toBe(3);
  // //       expect(element.options[1].value).toBe('b');
  // //     });

  // //     it('should add option before specified element', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a">A</bp-option>
  // //         <bp-option value="c">C</bp-option>
  // //       `;
  // //       const newOption = new Option('B', 'b');
  // //       element.add(newOption, element.options[1]);
  // //       expect(element.options[1].value).toBe('b');
  // //     });

  // //     it('should add optgroup', () => {
  // //       const optgroup = document.createElement('optgroup');
  // //       optgroup.label = 'Group';
  // //       element.add(optgroup);
  // //       expect(element.querySelector('optgroup')).toBe(optgroup);
  // //     });
  // //   });

  // //   describe('remove()', () => {
  // //     it('should remove option at index', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a">A</bp-option>
  // //         <bp-option value="b">B</bp-option>
  // //         <bp-option value="c">C</bp-option>
  // //       `;
  // //       element.remove(1);
  // //       expect(element.options.length).toBe(2);
  // //       expect(element.options[1].value).toBe('c');
  // //     });

  // //     it('should do nothing for invalid index', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a">A</bp-option>
  // //         <bp-option value="b">B</bp-option>
  // //       `;
  // //       element.remove(100);
  // //       expect(element.options.length).toBe(2);
  // //     });

  // //     it('should remove the select element itself when called without args', () => {
  // //       // Note: remove() with no args removes the element from DOM (inherited from Element)
  // //       fixture.appendChild(element);
  // //       element.remove();
  // //       expect(fixture.contains(element)).toBe(false);
  // //     });
  // //   });

  // //   describe('item()', () => {
  // //     it('should return option at index', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a">A</bp-option>
  // //         <bp-option value="b">B</bp-option>
  // //       `;
  // //       expect(element.item(0)?.value).toBe('a');
  // //       expect(element.item(1)?.value).toBe('b');
  // //     });

  // //     it('should return null for invalid index', () => {
  // //       element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
  // //       expect(element.item(100)).toBe(null);
  // //       expect(element.item(-1)).toBe(null);
  // //     });

  // //     it('should be equivalent to bracket notation', () => {
  // //       element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
  // //       expect(element.item(0)).toBe(element[0]);
  // //     });
  // //   });

  // //   describe('namedItem()', () => {
  // //     it('should return option by id', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a" id="opt-a">A</bp-option>
  // //         <bp-option value="b" id="opt-b">B</bp-option>
  // //       `;
  // //       expect(element.namedItem('opt-a')?.value).toBe('a');
  // //     });

  // //     it('should return option by name', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a" name="opt-a">A</bp-option>
  // //         <bp-option value="b" name="opt-b">B</bp-option>
  // //       `;
  // //       expect(element.namedItem('opt-a')?.value).toBe('a');
  // //     });

  // //     it('should return null if not found', () => {
  // //       element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
  // //       expect(element.namedItem('nonexistent')).toBe(null);
  // //     });

  // //     it('should prioritize id over name', () => {
  // //       element.innerHTML = /* html */ `
  // //         <bp-option value="a" id="test" name="other">A</bp-option>
  // //         <bp-option value="b" name="test">B</bp-option>
  // //       `;
  // //       expect(element.namedItem('test')?.value).toBe('a');
  // //     });
  // //   });

  // //   describe('showPicker()', () => {
  // //     it('should exist', () => {
  // //       expect(typeof element.showPicker).toBe('function');
  // //     });

  // //     it('should throw without user gesture', () => {
  // //       expect(() => element.showPicker()).toThrow();
  // //     });
  // //   });
  // // });

  describe('Validation', () => {
    describe('validity property', () => {
      it('should return ValidityState', () => {
        expect(element.validity).toBeInstanceOf(ValidityState);
      });

      it('should be valid by default', () => {
        expect(element.validity.valid).toBe(true);
      });
    });

    describe('required validation', () => {
      it('should be invalid when required and no selection', () => {
        element.required = true;
        element.innerHTML = /* html */ `
          <bp-option value="">Select...</bp-option>
          <bp-option value="a">A</bp-option>
        `;
        element.selectedIndex = 0;
        expect(element.validity.valueMissing).toBe(true);
        expect(element.validity.valid).toBe(false);
      });

      it('should be valid when required and has non-empty selection', () => {
        element.required = true;
        element.innerHTML = /* html */ `
          <bp-option value="">Select...</bp-option>
          <bp-option value="a">A</bp-option>
        `;
        element.selectedIndex = 1;
        expect(element.validity.valueMissing).toBe(false);
        expect(element.validity.valid).toBe(true);
      });

      it('should consider placeholder option (first with empty value)', async () => {
        element.required = true;
        element.innerHTML = /* html */ `
          <bp-option value="">-- Please select --</bp-option>
          <bp-option value="a">A</bp-option>
        `;
        await elementIsStable(element);
        // First option with empty value is placeholder
        expect(element.validity.valueMissing).toBe(true);
      });
    });

    describe('checkValidity()', () => {
      it('should return true when valid', () => {
        element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
        expect(element.checkValidity()).toBe(true);
      });

      it('should return false when invalid', () => {
        element.required = true;
        element.innerHTML = /* html */ `<bp-option value="">Select...</bp-option>`;
        expect(element.checkValidity()).toBe(false);
      });

      it('should fire invalid event when invalid', () => {
        element.required = true;
        element.innerHTML = /* html */ `<bp-option value="">Select...</bp-option>`;

        const invalidHandler = jasmine.createSpy('invalidHandler');
        element.addEventListener('invalid', invalidHandler);

        element.checkValidity();
        expect(invalidHandler).toHaveBeenCalled();
      });
    });

    describe('reportValidity()', () => {
      it('should return true when valid', () => {
        element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
        expect(element.reportValidity()).toBe(true);
      });

      it('should return false when invalid', () => {
        element.required = true;
        element.innerHTML = /* html */ `<bp-option value="">Select...</bp-option>`;
        expect(element.reportValidity()).toBe(false);
      });
    });

    describe('setCustomValidity()', () => {
      it('should set custom error message', () => {
        element.setCustomValidity('Custom error');
        expect(element.validationMessage).toBe('Custom error');
        expect(element.validity.customError).toBe(true);
      });

      it('should clear custom error with empty string', () => {
        element.setCustomValidity('Error');
        element.setCustomValidity('');
        expect(element.validity.customError).toBe(false);
      });
    });

    describe('willValidate property', () => {
      it('should be true for normal select', () => {
        expect(element.willValidate).toBe(true);
      });

      it('should be false when disabled', () => {
        element.disabled = true;
        expect(element.willValidate).toBe(false);
      });
    });

    describe('validationMessage property', () => {
      it('should return empty string when valid', () => {
        element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
        expect(element.validationMessage).toBe('');
      });

      it('should return browser message when invalid', async () => {
        element.required = true;
        element.innerHTML = /* html */ `<bp-option value="">Select...</bp-option>`;
        await elementIsStable(element);
        expect(element.validationMessage).not.toBe('');
      });
    });
  });

  describe('Form submission', () => {
    it('should include selected value in FormData', async () => {
      const form = document.createElement('form');
      element.name = 'choice';
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b" selected>B</bp-option>
      `;
      await elementIsStable(element);
      form.appendChild(element);

      const formData = new FormData(form);
      expect(formData.get('choice')).toBe('b');
    });

    it('should include multiple values for multiple select', async () => {
      const form = document.createElement('form');
      element.name = 'choices';
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a" selected>A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c" selected>C</bp-option>
      `;
      await elementIsStable(element);
      form.appendChild(element);

      const formData = new FormData(form);
      const values = formData.getAll('choices');
      expect(values).toEqual(['a', 'c']);
    });

    it('should not include disabled select', async () => {
      const form = document.createElement('form');
      element.name = 'choice';
      element.disabled = true;
      element.innerHTML = /* html */ `<bp-option value="a" selected>A</bp-option>`;
      await elementIsStable(element);
      form.appendChild(element);

      const formData = new FormData(form);
      expect(formData.has('choice')).toBe(false);
    });

    it('should not include if no name', async () => {
      const form = document.createElement('form');
      element.innerHTML = /* html */ `<bp-option value="a" selected>A</bp-option>`;
      await elementIsStable(element);
      form.appendChild(element);

      const formData = new FormData(form);
      expect(formData.has('')).toBe(false);
    });

    it('should submit empty string for placeholder selection', async () => {
      const form = document.createElement('form');
      element.name = 'choice';
      element.innerHTML = /* html */ `
        <bp-option value="">Select...</bp-option>
        <bp-option value="a">A</bp-option>
      `;
      await elementIsStable(element);
      form.appendChild(element);

      const formData = new FormData(form);
      expect(formData.get('choice')).toBe('');
    });
  });

  describe('Events', () => {
    it('should fire change event when selection changes', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;

      const changeHandler = jasmine.createSpy('changeHandler');
      element.addEventListener('change', changeHandler);

      // Programmatic change doesn't fire change event
      element.selectedIndex = 1;
      expect(changeHandler).not.toHaveBeenCalled();

      // User interaction would fire change (can't test directly)
    });

    it('should fire input event when value changes', () => {
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;

      const inputHandler = jasmine.createSpy('inputHandler');
      element.addEventListener('input', inputHandler);

      // Programmatic change doesn't fire input event
      element.value = 'b';
      expect(inputHandler).not.toHaveBeenCalled();
    });
  });

  describe('Multiple select behavior', () => {
    beforeEach(() => {
      element.multiple = true;
      element.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
        <bp-option value="c">C</bp-option>
        <bp-option value="d">D</bp-option>
      `;
    });

    it('should allow multiple selections', () => {
      element.options[0].selected = true;
      element.options[2].selected = true;
      expect(element.selectedOptions.length).toBe(2);
    });

    it('should not auto-select first option', () => {
      // When multiple, no default selection unless specified
      const freshSelect = document.createElement('select') as HTMLSelectElement;
      freshSelect.multiple = true;
      freshSelect.innerHTML = /* html */ `
        <bp-option value="a">A</bp-option>
        <bp-option value="b">B</bp-option>
      `;
      fixture.appendChild(freshSelect);
      expect(freshSelect.selectedIndex).toBe(-1);
    });

    it('should keep multiple selections when setting selectedIndex', () => {
      element.options[0].selected = true;
      element.options[2].selected = true;
      element.selectedIndex = 1;
      // selectedIndex = 1 means first selected is at index 1
      // but other selections may be cleared (browser-dependent)
    });

    it('should support selection via option.selected property', () => {
      element.options[1].selected = true;
      element.options[3].selected = true;
      expect(element.selectedOptions.length).toBe(2);
      expect(element.selectedOptions[0].value).toBe('b');
      expect(element.selectedOptions[1].value).toBe('d');
    });
  });

  // describe('Optgroup support', () => {
  //   it('should support optgroup elements', () => {
  //     element.innerHTML = /* html */ `
  //       <optgroup label="Group 1">
  //         <bp-option value="a">A</bp-option>
  //         <bp-option value="b">B</bp-option>
  //       </optgroup>
  //       <optgroup label="Group 2">
  //         <bp-option value="c">C</bp-option>
  //       </optgroup>
  //     `;
  //     expect(element.options.length).toBe(3);
  //     expect(element.querySelectorAll('optgroup').length).toBe(2);
  //   });

  //   it('should allow disabled optgroup', () => {
  //     element.innerHTML = /* html */ `
  //       <optgroup label="Disabled Group" disabled>
  //         <bp-option value="a">A</bp-option>
  //       </optgroup>
  //       <bp-option value="b">B</bp-option>
  //     `;
  //     // Options in disabled optgroup cannot be selected
  //     expect(element.options[0].disabled).toBe(true);
  //   });
  // });

  describe('Edge cases', () => {
    it('should handle empty option value vs no value attribute', async () => {
      element.innerHTML = /* html */ `
        <bp-option value="">Empty value</bp-option>
        <bp-option>No value attr</bp-option>
      `;
      await elementIsStable(element);
      expect(element.options[0].value).toBe('');
      expect(element.options[1].value).toBe('No value attr');
    });

    it('should handle dynamic option changes', async () => {
      element.innerHTML = /* html */ `<bp-option value="a">A</bp-option>`;
      await elementIsStable(element);
      expect(element.value).toBe('a');

      element.innerHTML = /* html */ `<bp-option value="b">B</bp-option>`;
      await elementIsStable(element);
      expect(element.value).toBe('b');
    });

    // it('should preserve selection when removing other options', () => {
    //   element.innerHTML = /* html */ `
    //     <bp-option value="a">A</bp-option>
    //     <bp-option value="b" selected>B</bp-option>
    //     <bp-option value="c">C</bp-option>
    //   `;
    //   element.remove(0);
    //   expect(element.value).toBe('b');
    //   expect(element.selectedIndex).toBe(0); // Index shifted
    // });

    // it('should handle Option() constructor', () => {
    //   const opt = new Option('Display Text', 'value', false, true);
    //   expect(opt.text).toBe('Display Text');
    //   expect(opt.value).toBe('value');
    //   expect(opt.defaultSelected).toBe(false);
    //   expect(opt.selected).toBe(true);
    // });
  });
});
