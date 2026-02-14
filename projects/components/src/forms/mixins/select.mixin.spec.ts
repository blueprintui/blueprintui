import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { SelectFormControlMixin, OptionMixin, SelectOption } from './select.mixin.js';
import '@blueprintui/components/include/forms.js';

@customElement('bp-test-option')
class TestOption extends OptionMixin(LitElement) implements SelectOption {}

@customElement('bp-test-select')
class TestSelect extends SelectFormControlMixin<typeof LitElement, string>(LitElement) {
  get options(): TestOption[] {
    return Array.from(this.querySelectorAll<TestOption>('bp-test-option'));
  }

  render() {
    return html`<slot @slotchange=${this.updateInitialSelected}></slot>`;
  }
}

describe('FormControlSelectMixin', () => {
  let element: TestSelect;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>select</label>
        <bp-test-select name="test">
          <bp-test-option value="one">Option One</bp-test-option>
          <bp-test-option value="two">Option Two</bp-test-option>
          <bp-test-option value="three">Option Three</bp-test-option>
        </bp-test-select>
      </bp-field>
    `);

    element = fixture.querySelector<TestSelect>('bp-test-select');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  it('should have form association enabled', async () => {
    expect(TestSelect.formAssociated).toBe(true);
  });

  describe('type property', () => {
    it('should return "select-one" by default', async () => {
      expect(element.type).toBe('select-one');
    });

    it('should return "select-multiple" when multiple is true', async () => {
      element.multiple = true;
      expect(element.type).toBe('select-multiple');
    });

    it('should set multiple to true when type is set to "select-multiple"', async () => {
      element.type = 'select-multiple';
      expect(element.multiple).toBe(true);
    });

    it('should set multiple to false when type is set to "select-one"', async () => {
      element.multiple = true;
      element.type = 'select-one';
      expect(element.multiple).toBe(false);
    });

    it('should not change multiple for other type values', async () => {
      element.multiple = true;
      element.type = 'text';
      expect(element.multiple).toBe(true);
    });
  });

  describe('size property', () => {
    it('should default to 1 (unlike input which defaults to 20)', async () => {
      expect(element.size).toBe(1);
    });

    it('should reflect size attribute', async () => {
      element.setAttribute('size', '5');
      expect(element.size).toBe(5);
    });

    it('should update attribute when property is set', async () => {
      element.size = 10;
      expect(element.getAttribute('size')).toBe('10');
    });
  });

  describe('options property', () => {
    it('should return array of option elements', async () => {
      expect(element.options).toBeInstanceOf(Array);
      expect(element.options.length).toBe(3);
    });

    it('should return elements with correct values', async () => {
      expect(element.options[0].value).toBe('one');
      expect(element.options[1].value).toBe('two');
      expect(element.options[2].value).toBe('three');
    });

    it('should update when options are added', async () => {
      const newOption = document.createElement('bp-test-option') as TestOption;
      newOption.value = 'four';
      newOption.textContent = 'Option Four';
      element.appendChild(newOption);
      await elementIsStable(element);
      expect(element.options.length).toBe(4);
    });

    it('should update when options are removed', async () => {
      element.options[2].remove();
      await elementIsStable(element);
      expect(element.options.length).toBe(2);
    });
  });

  describe('selectedOptions property', () => {
    it('should return array of selected options', async () => {
      expect(element.selectedOptions).toBeInstanceOf(Array);
    });

    it('should include options with selected property set', async () => {
      // First deselect all, then select only option[1]
      element.options.forEach(o => (o.selected = false));
      element.options[1].selected = true;
      expect(element.selectedOptions.length).toBe(1);
      expect(element.selectedOptions[0]).toBe(element.options[1]);
    });

    it('should include multiple selected options when multiple is true', async () => {
      element.multiple = true;
      element.options[0].selected = true;
      element.options[2].selected = true;
      expect(element.selectedOptions.length).toBe(2);
    });

    it('should return empty array when no options are selected', async () => {
      element.options.forEach(o => (o.selected = false));
      expect(element.selectedOptions.length).toBe(0);
    });
  });

  describe('selectedIndex property', () => {
    it('should return -1 when no option is selected', async () => {
      element.options.forEach(o => (o.selected = false));
      expect(element.selectedIndex).toBe(-1);
    });

    it('should return index of first selected option', async () => {
      // First deselect all, then select only option[1]
      element.options.forEach(o => (o.selected = false));
      element.options[1].selected = true;
      expect(element.selectedIndex).toBe(1);
    });

    it('should set selected option by index', async () => {
      element.selectedIndex = 2;
      await elementIsStable(element);
      expect(element.options[2].selected).toBe(true);
      expect(element.value).toBe('three');
    });

    it('should deselect all other options when setting selectedIndex', async () => {
      element.options[0].selected = true;
      element.options[1].selected = true;
      element.selectedIndex = 2;
      await elementIsStable(element);
      expect(element.options[0].selected).toBe(false);
      expect(element.options[1].selected).toBe(false);
      expect(element.options[2].selected).toBe(true);
    });

    it('should set value to empty string for invalid index', async () => {
      element.selectedIndex = 10;
      expect(element.value).toBe('');
    });

    it('should set value to empty string for negative index', async () => {
      element.selectedIndex = -1;
      expect(element.value).toBe('');
    });
  });

  describe('length property', () => {
    it('should return the number of options', async () => {
      expect(element.length).toBe(3);
    });

    it('should update when options change', async () => {
      const newOption = document.createElement('bp-test-option') as TestOption;
      newOption.value = 'four';
      element.appendChild(newOption);
      await elementIsStable(element);
      expect(element.length).toBe(4);
    });
  });

  describe('value property', () => {
    it('should sync selected state on options when value is set', async () => {
      element.value = 'two';
      await elementIsStable(element);
      expect(element.options[0].selected).toBe(false);
      expect(element.options[1].selected).toBe(true);
      expect(element.options[2].selected).toBe(false);
    });

    it('should deselect all options when value does not match any option', async () => {
      element.value = 'nonexistent';
      await elementIsStable(element);
      expect(element.options.every(o => !o.selected)).toBe(true);
      expect(element.value).toBe('');
    });

    it('should return the value of the first selected option', async () => {
      // Use selectedIndex to set selection properly
      element.selectedIndex = 1;
      await elementIsStable(element);
      expect(element.value).toBe('two');
    });
  });

  describe('updateInitialSelected method', () => {
    it('should select options with selected attribute', async () => {
      const selectedFixture = await createFixture(html`
        <bp-field>
          <label>select</label>
          <bp-test-select name="test">
            <bp-test-option value="one">Option One</bp-test-option>
            <bp-test-option value="two" selected>Option Two</bp-test-option>
            <bp-test-option value="three">Option Three</bp-test-option>
          </bp-test-select>
        </bp-field>
      `);
      const selectElement = selectedFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      expect(selectElement.value).toBe('two');
      expect(selectElement.options[1].selected).toBe(true);
      removeFixture(selectedFixture);
    });

    it('should auto-select first option when none selected (native select behavior)', async () => {
      element.options.forEach(o => o.removeAttribute('selected'));
      element.options.forEach(o => (o.selected = false));
      element.updateInitialSelected();
      await elementIsStable(element);

      expect(element.options[0].selected).toBe(true);
      expect(element.value).toBe('one');
    });

    it('should set defaultValue on first call', async () => {
      const newFixture = await createFixture(html`
        <bp-field>
          <label>select</label>
          <bp-test-select name="test">
            <bp-test-option value="first" selected>First</bp-test-option>
            <bp-test-option value="second">Second</bp-test-option>
          </bp-test-select>
        </bp-field>
      `);
      const selectElement = newFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      expect(selectElement.defaultValue).toBe('first');
      removeFixture(newFixture);
    });
  });

  describe('multiple select', () => {
    it('should support multiple property', async () => {
      expect(element.multiple).toBe(false);
      element.multiple = true;
      expect(element.multiple).toBe(true);
    });

    it('should add multiple CSS state', async () => {
      element.multiple = true;
      await elementIsStable(element);
      expect(element.matches(':state(multiple)')).toBe(true);
    });

    it('should allow multiple selected options when multiple is true', async () => {
      element.multiple = true;
      element.options[0].selected = true;
      element.options[2].selected = true;
      expect(element.selectedOptions.length).toBe(2);
    });
  });

  describe('form integration', () => {
    it('should include value in form data for single select', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-select name="color">
            <bp-test-option value="red" selected>Red</bp-test-option>
            <bp-test-option value="blue">Blue</bp-test-option>
          </bp-test-select>
        </form>
      `);
      const selectElement = formFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);
      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('color')).toBe('red');
      removeFixture(formFixture);
    });

    it('should include multiple values for multiple select', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-select name="colors" multiple>
            <bp-test-option value="red" selected>Red</bp-test-option>
            <bp-test-option value="blue" selected>Blue</bp-test-option>
            <bp-test-option value="green">Green</bp-test-option>
          </bp-test-select>
        </form>
      `);
      const selectElement = formFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      // Wait for queueMicrotask to complete
      await new Promise(resolve => queueMicrotask(() => resolve(undefined)));

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.getAll('colors')).toEqual(['red', 'blue']);
      removeFixture(formFixture);
    });

    it('should update form value when selection changes', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-select name="item">
            <bp-test-option value="a" selected>A</bp-test-option>
            <bp-test-option value="b">B</bp-test-option>
          </bp-test-select>
        </form>
      `);
      const selectElement = formFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      selectElement.value = 'b';
      await elementIsStable(selectElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);
      expect(formData.get('item')).toBe('b');
      removeFixture(formFixture);
    });

    it('should reset to default value on form reset', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-select name="item">
            <bp-test-option value="a" selected>A</bp-test-option>
            <bp-test-option value="b">B</bp-test-option>
          </bp-test-select>
        </form>
      `);
      const selectElement = formFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      selectElement.value = 'b';
      await elementIsStable(selectElement);
      expect(selectElement.value).toBe('b');

      const form = formFixture.querySelector('form');
      form.reset();
      await elementIsStable(selectElement);
      expect(selectElement.value).toBe('a');
      removeFixture(formFixture);
    });
  });

  describe('option value defaults to textContent', () => {
    it('should use textContent when value is not explicitly set', async () => {
      const textFixture = await createFixture(html`
        <bp-test-select>
          <bp-test-option>Option Text</bp-test-option>
        </bp-test-select>
      `);
      const selectElement = textFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      expect(selectElement.options[0].value).toBe('Option Text');
      removeFixture(textFixture);
    });

    it('should use explicit value over textContent', async () => {
      const textFixture = await createFixture(html`
        <bp-test-select>
          <bp-test-option value="explicit">Text Content</bp-test-option>
        </bp-test-select>
      `);
      const selectElement = textFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      expect(selectElement.options[0].value).toBe('explicit');
      removeFixture(textFixture);
    });
  });

  describe('disabled options', () => {
    it('should support disabled property on options', async () => {
      element.options[1].disabled = true;
      expect(element.options[1].disabled).toBe(true);
    });

    it('should still include disabled options in options array', async () => {
      element.options[1].disabled = true;
      expect(element.options.length).toBe(3);
    });
  });

  describe('validation', () => {
    it('should support required validation', async () => {
      element.required = true;
      element.options.forEach(o => (o.selected = false));
      element.value = '';
      element.checkValidity();
      expect(element.validity.valueMissing).toBe(true);
    });

    it('should be valid when an option is selected', async () => {
      element.required = true;
      element.value = 'one';
      await elementIsStable(element);
      expect(element.validity.valid).toBe(true);
    });
  });
});

describe('OptionMixin', () => {
  let element: TestOption;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`<bp-test-option value="test">Test Option</bp-test-option>`);
    element = fixture.querySelector<TestOption>('bp-test-option');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  describe('value property', () => {
    it('should return explicit value when set', async () => {
      expect(element.value).toBe('test');
    });

    it('should default to textContent when value is not set', async () => {
      const noValueFixture = await createFixture(html`<bp-test-option>Option Text</bp-test-option>`);
      const noValueElement = noValueFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(noValueElement);

      expect(noValueElement.value).toBe('Option Text');
      removeFixture(noValueFixture);
    });

    it('should be settable via property', async () => {
      element.value = 'new-value';
      expect(element.value).toBe('new-value');
    });

    it('should reflect value attribute', async () => {
      element.setAttribute('value', 'attr-value');
      expect(element.value).toBe('attr-value');
    });

    it('should trim textContent for value', async () => {
      const trimFixture = await createFixture(html`<bp-test-option> Trimmed Text </bp-test-option>`);
      const trimElement = trimFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(trimElement);

      expect(trimElement.value).toBe('Trimmed Text');
      removeFixture(trimFixture);
    });

    it('should return empty string when no value and no textContent', async () => {
      const emptyFixture = await createFixture(html`<bp-test-option></bp-test-option>`);
      const emptyElement = emptyFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(emptyElement);

      expect(emptyElement.value).toBe('');
      removeFixture(emptyFixture);
    });
  });

  describe('selected property', () => {
    it('should default to false', async () => {
      const unselectedFixture = await createFixture(html`<bp-test-option>Test</bp-test-option>`);
      const unselectedElement = unselectedFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(unselectedElement);

      expect(unselectedElement.selected).toBe(false);
      removeFixture(unselectedFixture);
    });

    it('should be settable via property', async () => {
      element.selected = true;
      expect(element.selected).toBe(true);

      element.selected = false;
      expect(element.selected).toBe(false);
    });

    it('should reflect selected attribute', async () => {
      const selectedFixture = await createFixture(html`<bp-test-option selected>Test</bp-test-option>`);
      const selectedElement = selectedFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(selectedElement);

      expect(selectedElement.selected).toBe(true);
      removeFixture(selectedFixture);
    });

    it('should update when attribute is removed', async () => {
      const selectedFixture = await createFixture(html`<bp-test-option selected>Test</bp-test-option>`);
      const selectedElement = selectedFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(selectedElement);

      expect(selectedElement.selected).toBe(true);
      selectedElement.removeAttribute('selected');
      expect(selectedElement.selected).toBe(false);
      removeFixture(selectedFixture);
    });
  });

  describe('disabled property', () => {
    it('should default to false', async () => {
      const enabledFixture = await createFixture(html`<bp-test-option>Test</bp-test-option>`);
      const enabledElement = enabledFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(enabledElement);

      expect(enabledElement.disabled).toBe(false);
      removeFixture(enabledFixture);
    });

    it('should be settable via property', async () => {
      element.disabled = true;
      expect(element.disabled).toBe(true);

      element.disabled = false;
      expect(element.disabled).toBe(false);
    });

    it('should reflect disabled attribute', async () => {
      const disabledFixture = await createFixture(html`<bp-test-option disabled>Test</bp-test-option>`);
      const disabledElement = disabledFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(disabledElement);

      expect(disabledElement.disabled).toBe(true);
      removeFixture(disabledFixture);
    });

    it('should update when attribute is removed', async () => {
      const disabledFixture = await createFixture(html`<bp-test-option disabled>Test</bp-test-option>`);
      const disabledElement = disabledFixture.querySelector<TestOption>('bp-test-option');
      await elementIsStable(disabledElement);

      expect(disabledElement.disabled).toBe(true);
      disabledElement.removeAttribute('disabled');
      expect(disabledElement.disabled).toBe(false);
      removeFixture(disabledFixture);
    });
  });

  describe('integration with select', () => {
    it('should work correctly within a select element', async () => {
      const selectFixture = await createFixture(html`
        <bp-test-select>
          <bp-test-option value="a">A</bp-test-option>
          <bp-test-option value="b" selected>B</bp-test-option>
          <bp-test-option value="c" disabled>C</bp-test-option>
        </bp-test-select>
      `);
      const selectElement = selectFixture.querySelector<TestSelect>('bp-test-select');
      await elementIsStable(selectElement);

      expect(selectElement.options[0].value).toBe('a');
      expect(selectElement.options[1].value).toBe('b');
      expect(selectElement.options[1].selected).toBe(true);
      expect(selectElement.options[2].disabled).toBe(true);
      expect(selectElement.value).toBe('b');
      removeFixture(selectFixture);
    });
  });
});
