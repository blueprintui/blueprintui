import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent, emulateClick } from '@blueprintui/test';
import { BpCombobox } from '@blueprintui/components/combobox';
import '@blueprintui/components/include/combobox.js';

describe('bp-combobox', () => {
  let element: BpCombobox;
  let form: HTMLFormElement;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <form>
        <bp-field>
          <label>combobox</label>
          <bp-combobox name="test-combobox">
            <bp-option value="1">one</bp-option>
            <bp-option value="2">two</bp-option>
            <bp-option value="3">three</bp-option>
          </bp-combobox>
          <bp-field-message>message text</bp-field-message>
        </bp-field>
        <button>submit</button>
      </form>
    `);

    form = fixture.querySelector('form');
    element = fixture.querySelector<BpCombobox>('bp-combobox');
    form.addEventListener('submit', e => e.preventDefault());
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-combobox')).toBe(BpCombobox);
  });

  it('should have default mode of single', async () => {
    await elementIsStable(element);
    expect(element.mode).toBe('single');
  });

  it('should have default filter of contains', async () => {
    await elementIsStable(element);
    expect(element.filter).toBe('contains');
  });

  it('should render internal structure correctly', async () => {
    await elementIsStable(element);

    const internal = element.shadowRoot.querySelector('[part="internal"]');
    expect(internal).toBeTruthy();

    const input = element.shadowRoot.querySelector('[part="input"]');
    expect(input).toBeTruthy();
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');

    const listbox = element.shadowRoot.querySelector('[part="listbox"]');
    expect(listbox).toBeTruthy();
    expect(listbox.getAttribute('role')).toBe('listbox');
  });

  it('should sync aria-label from composed label', async () => {
    await elementIsStable(element);
    const input = element.shadowRoot.querySelector('[part="input"]');
    expect((input as HTMLInputElement).ariaLabel).toBe('combobox');
  });

  it('should open listbox on input focus', async () => {
    await elementIsStable(element);
    expect(element.open).toBe(false);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    await elementIsStable(element);

    expect(element.open).toBe(true);
  });

  it('should apply :state(open) when open', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(open)')).toBe(false);

    element.open = true;
    await elementIsStable(element);

    expect(element.matches(':state(open)')).toBe(true);
  });

  it('should apply :state(loading) when loading', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(loading)')).toBe(false);

    element.loading = true;
    await elementIsStable(element);

    expect(element.matches(':state(loading)')).toBe(true);
  });

  it('should apply :state(multiple) in multiple mode', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(multiple)')).toBe(false);

    element.mode = 'multiple';
    await elementIsStable(element);

    expect(element.matches(':state(multiple)')).toBe(true);
  });

  it('should handle disabled state', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);

    element.disabled = true;
    await elementIsStable(element);

    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    expect(input.disabled).toBe(true);
  });

  it('should handle readonly state', async () => {
    await elementIsStable(element);

    element.readonly = true;
    await elementIsStable(element);

    expect(element.readonly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    expect(input.readOnly).toBe(true);
  });

  it('should handle required state', async () => {
    element.required = true;
    await elementIsStable(element);

    expect(element.required).toBe(true);
    expect(typeof element.checkValidity).toBe('function');
  });

  it('should render options from slot content', async () => {
    await elementIsStable(element);
    element.open = true;
    await elementIsStable(element);

    const options = element.shadowRoot.querySelectorAll('[part="option"]');
    expect(options.length).toBe(3);
  });

  it('should select option on click in single mode', async () => {
    await elementIsStable(element);
    element.open = true;
    await elementIsStable(element);

    const options = element.shadowRoot.querySelectorAll('[part="option"]');
    emulateClick(options[1] as HTMLElement);
    await elementIsStable(element);

    expect(element.value).toBe('2');
    expect(element.open).toBe(false);
  });

  it('should filter options with contains strategy', async () => {
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    input.value = 'wo';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    const bpOptions = element.querySelectorAll('bp-option');
    const hiddenOptions = Array.from(bpOptions).filter(o => o.hidden);
    expect(hiddenOptions.length).toBe(2); // 'one' and 'three' should be hidden
  });

  it('should filter options with startswith strategy', async () => {
    element.filter = 'startswith';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    input.value = 'tw';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    const bpOptions = element.querySelectorAll('bp-option');
    const hiddenOptions = Array.from(bpOptions).filter(o => o.hidden);
    expect(hiddenOptions.length).toBe(2); // 'one' and 'three' should be hidden
  });

  it('should not filter when filter is none', async () => {
    element.filter = 'none';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    input.value = 'xyz';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    const bpOptions = element.querySelectorAll('bp-option');
    const hiddenOptions = Array.from(bpOptions).filter(o => o.hidden);
    expect(hiddenOptions.length).toBe(0);
  });

  it('should emit bp-filter event on input', async () => {
    await elementIsStable(element);

    let filterEventFired = false;
    let filterQuery = '';
    element.addEventListener('bp-filter', ((e: CustomEvent) => {
      filterEventFired = true;
      filterQuery = e.detail.query;
    }) as EventListener);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    input.value = 'test';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await elementIsStable(element);

    expect(filterEventFired).toBe(true);
    expect(filterQuery).toBe('test');
  });

  it('should navigate options with arrow keys', async () => {
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    await elementIsStable(element);

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);

    const activeOption = element.shadowRoot.querySelector('[part="option"][data-active]');
    expect(activeOption).toBeTruthy();
  });

  it('should select option with Enter key', async () => {
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.focus();
    await elementIsStable(element);

    // Navigate to first option
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await elementIsStable(element);

    // Select with Enter
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await elementIsStable(element);

    expect(element.value).toBe('1');
  });

  it('should close listbox with Escape key', async () => {
    await elementIsStable(element);

    element.open = true;
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await elementIsStable(element);

    expect(element.open).toBe(false);
  });

  it('should handle form submission', async () => {
    element.value = '2';
    await elementIsStable(element);

    const event = onceEvent(form, 'submit');
    const button = fixture.querySelector('button');
    emulateClick(button);
    await event;

    const formData = new FormData(form);
    expect(formData.get('test-combobox')).toBe('2');
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

  it('should support placeholder attribute', async () => {
    element.placeholder = 'Search...';
    await elementIsStable(element);

    const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
    expect(input.placeholder).toBe('Search...');
  });

  it('should handle dynamic option changes', async () => {
    await elementIsStable(element);

    const newOption = document.createElement('bp-option');
    newOption.value = '4';
    newOption.textContent = 'four';
    element.appendChild(newOption);

    await elementIsStable(element);
    element.open = true;
    await elementIsStable(element);

    const options = element.shadowRoot.querySelectorAll('[part="option"]');
    expect(options.length).toBe(4);
  });

  it('should handle disabled options', async () => {
    const disabledFixture = await createFixture(html`
      <bp-combobox>
        <bp-option value="1">one</bp-option>
        <bp-option value="2" disabled>two (disabled)</bp-option>
        <bp-option value="3">three</bp-option>
      </bp-combobox>
    `);

    const combobox = disabledFixture.querySelector('bp-combobox');
    await elementIsStable(combobox);

    combobox.open = true;
    await elementIsStable(combobox);

    const options = combobox.shadowRoot.querySelectorAll('[part="option"]');
    expect(options[1].getAttribute('aria-disabled')).toBe('true');

    removeFixture(disabledFixture);
  });

  it('should be focusable', async () => {
    await elementIsStable(element);
    element.focus();
    expect(document.activeElement).toBe(element);
  });

  describe('autocomplete mode', () => {
    let autocompleteElement: BpCombobox;
    let autocompleteFixture: HTMLElement;

    beforeEach(async () => {
      autocompleteFixture = await createFixture(html`
        <bp-combobox mode="autocomplete" name="search">
          <bp-option value="react">React</bp-option>
          <bp-option value="vue">Vue</bp-option>
          <bp-option value="angular">Angular</bp-option>
        </bp-combobox>
      `);
      autocompleteElement = autocompleteFixture.querySelector('bp-combobox');
    });

    afterEach(() => {
      removeFixture(autocompleteFixture);
    });

    it('should allow free text input', async () => {
      await elementIsStable(autocompleteElement);

      const input = autocompleteElement.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      input.focus();
      input.value = 'svelte';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await elementIsStable(autocompleteElement);

      expect(autocompleteElement.value).toBe('svelte');
    });

    it('should update value as user types', async () => {
      await elementIsStable(autocompleteElement);

      const input = autocompleteElement.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      input.focus();
      input.value = 'test';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await elementIsStable(autocompleteElement);

      expect(autocompleteElement.value).toBe('test');
    });
  });

  describe('multiple mode', () => {
    let multipleElement: BpCombobox;
    let multipleFixture: HTMLElement;

    beforeEach(async () => {
      multipleFixture = await createFixture(html`
        <form>
          <bp-combobox mode="multiple" name="tags">
            <bp-option value="bug">Bug</bp-option>
            <bp-option value="feature">Feature</bp-option>
            <bp-option value="docs">Documentation</bp-option>
          </bp-combobox>
        </form>
      `);
      multipleElement = multipleFixture.querySelector('bp-combobox');
    });

    afterEach(() => {
      removeFixture(multipleFixture);
    });

    it('should toggle selection on option click', async () => {
      await elementIsStable(multipleElement);
      multipleElement.open = true;
      await elementIsStable(multipleElement);

      const options = multipleElement.shadowRoot.querySelectorAll('[part="option"]');
      emulateClick(options[0] as HTMLElement);
      await elementIsStable(multipleElement);

      expect(multipleElement.value).toBe('bug');

      emulateClick(options[1] as HTMLElement);
      await elementIsStable(multipleElement);

      expect(multipleElement.value).toBe('bug,feature');
    });

    it('should render tags for selected values', async () => {
      multipleElement.value = 'bug,feature';
      await elementIsStable(multipleElement);

      const tags = multipleElement.shadowRoot.querySelectorAll('[part="tag"]');
      expect(tags.length).toBe(2);
    });

    it('should remove value when tag is closed', async () => {
      multipleElement.value = 'bug,feature';
      await elementIsStable(multipleElement);

      const tags = multipleElement.shadowRoot.querySelectorAll('[part="tag"]');
      const closeEvent = new CustomEvent('close', { bubbles: true });
      tags[0].dispatchEvent(closeEvent);
      await elementIsStable(multipleElement);

      expect(multipleElement.value).toBe('feature');
    });

    it('should keep listbox open after selection', async () => {
      await elementIsStable(multipleElement);
      multipleElement.open = true;
      await elementIsStable(multipleElement);

      const options = multipleElement.shadowRoot.querySelectorAll('[part="option"]');
      emulateClick(options[0] as HTMLElement);
      await elementIsStable(multipleElement);

      expect(multipleElement.open).toBe(true);
    });

    it('should toggle selection with Space key', async () => {
      await elementIsStable(multipleElement);

      const input = multipleElement.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      input.focus();
      await elementIsStable(multipleElement);

      // Navigate to first option
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await elementIsStable(multipleElement);

      // Toggle with Space
      input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
      await elementIsStable(multipleElement);

      expect(multipleElement.value).toBe('bug');
    });

    it('should remove last tag with Backspace when input is empty', async () => {
      multipleElement.value = 'bug,feature';
      await elementIsStable(multipleElement);

      const input = multipleElement.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      input.focus();
      input.value = '';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
      await elementIsStable(multipleElement);

      expect(multipleElement.value).toBe('bug');
    });

    it('should handle comma-separated value in form data', async () => {
      multipleElement.value = 'bug,feature';
      await elementIsStable(multipleElement);

      const form = multipleFixture.querySelector('form');
      const formData = new FormData(form);
      expect(formData.get('tags')).toBe('bug,feature');
    });
  });

  describe('pre-selected values', () => {
    it('should display pre-selected value in single mode', async () => {
      const preselectedFixture = await createFixture(html`
        <bp-combobox value="2">
          <bp-option value="1">one</bp-option>
          <bp-option value="2">two</bp-option>
          <bp-option value="3">three</bp-option>
        </bp-combobox>
      `);

      const combobox = preselectedFixture.querySelector('bp-combobox');
      await elementIsStable(combobox);

      const input = combobox.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      expect(input.value).toBe('two');

      removeFixture(preselectedFixture);
    });

    it('should display pre-selected values as tags in multiple mode', async () => {
      const preselectedFixture = await createFixture(html`
        <bp-combobox mode="multiple" value="bug,feature">
          <bp-option value="bug">Bug</bp-option>
          <bp-option value="feature">Feature</bp-option>
          <bp-option value="docs">Documentation</bp-option>
        </bp-combobox>
      `);

      const combobox = preselectedFixture.querySelector('bp-combobox');
      await elementIsStable(combobox);

      const tags = combobox.shadowRoot.querySelectorAll('[part="tag"]');
      expect(tags.length).toBe(2);

      removeFixture(preselectedFixture);
    });
  });

  describe('empty and loading states', () => {
    it('should show empty slot when no options match filter', async () => {
      await elementIsStable(element);

      const input = element.shadowRoot.querySelector<HTMLInputElement>('[part="input"]');
      input.focus();
      input.value = 'xyz';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      await elementIsStable(element);

      const emptySlot = element.shadowRoot.querySelector('[part="empty"]');
      expect(emptySlot).toBeTruthy();
    });

    it('should show loading slot when loading is true', async () => {
      element.loading = true;
      element.open = true;
      await elementIsStable(element);

      const loadingSlot = element.shadowRoot.querySelector('slot[name="loading"]');
      expect(loadingSlot).toBeTruthy();
    });
  });

  it('should support CSS custom properties', async () => {
    element.style.setProperty('--background', 'white');
    element.style.setProperty('--color', 'black');
    element.style.setProperty('--border', '1px solid gray');
    element.style.setProperty('--border-radius', '4px');
    element.style.setProperty('--padding', '8px');
    element.style.setProperty('--font-size', '14px');
    element.style.setProperty('--height', '40px');
    element.style.setProperty('--min-width', '120px');
    element.style.setProperty('--width', '200px');
    element.style.setProperty('--listbox-max-height', '300px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('white');
    expect(element.style.getPropertyValue('--color')).toBe('black');
    expect(element.style.getPropertyValue('--border')).toBe('1px solid gray');
    expect(element.style.getPropertyValue('--border-radius')).toBe('4px');
    expect(element.style.getPropertyValue('--padding')).toBe('8px');
    expect(element.style.getPropertyValue('--font-size')).toBe('14px');
    expect(element.style.getPropertyValue('--height')).toBe('40px');
    expect(element.style.getPropertyValue('--min-width')).toBe('120px');
    expect(element.style.getPropertyValue('--width')).toBe('200px');
    expect(element.style.getPropertyValue('--listbox-max-height')).toBe('300px');
  });
});
