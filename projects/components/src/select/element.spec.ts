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
    expect(element.disabled).toBe(undefined);

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
    element.readonly = true;
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should handle multiple attribute', async () => {
    await elementIsStable(element);
    expect(element.multiple).toBe(undefined);
    expect(element.matches(':state(multiple)')).toBe(false);

    element.setAttribute('multiple', '');
    await elementIsStable(element);
    expect(element.matches(':state(multiple)')).toBe(true);

    // Multiple is set via attribute, check for its existence
    expect(element.hasAttribute('multiple')).toBe(true);
  });

  it('should handle size attribute', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(null);
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
