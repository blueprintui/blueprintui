import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpSearch } from '@blueprintui/components/search';
import '@blueprintui/components/include/search.js';

describe('bp-search', () => {
  let element: BpSearch;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>search</label>
        <bp-search></bp-search>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpSearch>('bp-search');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-search')).toBe(BpSearch);
  });

  it('should default its input type to "search"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('search');
  });

  it('should render the search icon', async () => {
    await elementIsStable(element);
    const icon = element.shadowRoot.querySelector('bp-button-icon');
    expect(icon.shape).toBe('search');
    expect(icon.readonly).toBe(true);
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

  it('should support inherited properties', async () => {
    await elementIsStable(element);

    // Test boolean properties with CSS states using attributes
    element.setAttribute('disabled', '');
    await elementIsStable(element);
    expect(element.disabled).toBe(true);
    expect(element.matches(':state(disabled)')).toBe(true);

    element.removeAttribute('disabled');
    await elementIsStable(element);
    expect(element.disabled).toBe(false);
    expect(element.matches(':state(disabled)')).toBe(false);

    // Test readonly property using attribute
    element.setAttribute('readonly', '');
    await elementIsStable(element);
    expect(element.readonly).toBe(true);
    expect(element.matches(':state(readonly)')).toBe(true);

    element.removeAttribute('readonly');
    await elementIsStable(element);
    expect(element.readonly).toBe(false);
    expect(element.matches(':state(readonly)')).toBe(false);

    // Test required property
    element.required = true;
    await elementIsStable(element);
    expect(element.required).toBe(true);

    element.required = false;
    await elementIsStable(element);
    expect(element.required).toBe(false);

    // Test properties that are reflected to attributes
    element.placeholder = 'Search here';
    await elementIsStable(element);
    expect(element.placeholder).toBe('Search here');

    element.autocomplete = 'on';
    await elementIsStable(element);
    expect(element.autocomplete).toBe('on');
    expect(element.getAttribute('autocomplete')).toBe('on');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test ARIA attributes
    expect(element._internals.role).toBe('presentation');
    expect(element._internals.states.has('bp-layer')).toBe(true);

    // Test focus management - search input should be focusable
    const input = element.shadowRoot.querySelector('input');
    expect(input.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    expect(input.disabled).toBe(true);
  });

  it('should handle input and change events', async () => {
    await elementIsStable(element);

    // Simulate input event with proper event structure
    const inputEvent = onceEvent(element, 'input');
    const preventDefault = () => {};
    const stopPropagation = () => {};
    (element as any).onInput({
      target: { value: 'test search' },
      data: 'test search',
      preventDefault,
      stopPropagation
    });
    expect(await inputEvent).toBeTruthy();
    expect(element.value).toBe('test search');

    // Simulate change event with proper event structure
    const changeEvent = onceEvent(element, 'change');
    (element as any).onChange({
      target: { value: 'updated search' },
      preventDefault,
      stopPropagation
    });
    expect(await changeEvent).toBeTruthy();
    expect(element.value).toBe('updated search');
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpSearch.formAssociated).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should support CSS custom properties', async () => {
    await elementIsStable(element);

    element.style.setProperty('--background', 'red');
    element.style.setProperty('--color', 'white');
    element.style.setProperty('--border', '2px solid blue');
    element.style.setProperty('--padding', '10px');

    await elementIsStable(element);

    expect(element.style.getPropertyValue('--background')).toBe('red');
    expect(element.style.getPropertyValue('--color')).toBe('white');
    expect(element.style.getPropertyValue('--border')).toBe('2px solid blue');
    expect(element.style.getPropertyValue('--padding')).toBe('10px');
  });

  it('should handle value property changes', async () => {
    await elementIsStable(element);
    expect(element.value).toBe('');

    element.value = 'initial value';
    await elementIsStable(element);
    expect(element.value).toBe('initial value');

    element.value = 'updated value';
    await elementIsStable(element);
    expect(element.value).toBe('updated value');
  });

  it('should handle size property', async () => {
    await elementIsStable(element);
    expect(element.size).toBe(null);

    element.size = 20;
    await elementIsStable(element);
    expect(element.size).toBe(20);
  });

  it('should handle minLength and maxLength properties', async () => {
    await elementIsStable(element);
    expect(element.minLength).toBe(undefined);
    expect(element.maxLength).toBe(undefined);

    element.minLength = 3;
    element.maxLength = 50;
    await elementIsStable(element);
    expect(element.minLength).toBe(3);
    expect(element.maxLength).toBe(50);
  });

  it('should handle pattern property', async () => {
    await elementIsStable(element);
    expect(element.pattern).toBe(undefined);

    element.pattern = '[A-Za-z]{3}';
    await elementIsStable(element);
    expect(element.pattern).toBe('[A-Za-z]{3}');
  });

  it('should handle multiple property', async () => {
    await elementIsStable(element);
    expect(element.multiple).toBe(undefined);

    element.multiple = true;
    await elementIsStable(element);
    expect(element.multiple).toBe(true);

    element.multiple = false;
    await elementIsStable(element);
    expect(element.multiple).toBe(false);
  });

  it('should handle formNoValidate property', async () => {
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(undefined);

    element.formNoValidate = true;
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(true);
    expect(element.getAttribute('formnovalidate')).toBe('');

    element.formNoValidate = false;
    await elementIsStable(element);
    expect(element.formNoValidate).toBe(false);
    expect(element.getAttribute('formnovalidate')).toBe(null);
  });
});
