import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { BpTelephone } from '@blueprintui/components/telephone';
import '@blueprintui/components/include/telephone.js';

describe('bp-telephone', () => {
  let element: BpTelephone;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>Phone Number</label>
        <bp-telephone></bp-telephone>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpTelephone>('bp-telephone');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-telephone')).toBe(BpTelephone);
  });

  it('should default its input type to "tel"', async () => {
    await elementIsStable(element);
    expect(element.type).toBe('tel');
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
    element.placeholder = '+1 (555) 123-4567';
    await elementIsStable(element);
    expect(element.placeholder).toBe('+1 (555) 123-4567');

    element.autocomplete = 'tel';
    await elementIsStable(element);
    expect(element.autocomplete).toBe('tel');
    expect(element.getAttribute('autocomplete')).toBe('tel');
  });

  it('should have proper accessibility attributes', async () => {
    await elementIsStable(element);

    // Test ARIA attributes
    expect(element._internals.role).toBe('presentation');
    expect(element._internals.states.has('bp-layer')).toBe(true);

    // Test focus management - telephone input should be focusable
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
      target: { value: '+1 555-123-4567' },
      data: '+1 555-123-4567',
      preventDefault,
      stopPropagation
    });
    expect(await inputEvent).toBeTruthy();
    expect(element.value).toBe('+1 555-123-4567');

    // Simulate change event with proper event structure
    const changeEvent = onceEvent(element, 'change');
    (element as any).onChange({
      target: { value: '+1 555-987-6543' },
      preventDefault,
      stopPropagation
    });
    expect(await changeEvent).toBeTruthy();
    expect(element.value).toBe('+1 555-987-6543');
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpTelephone.formAssociated).toBe(true);
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

    element.value = '+1 555-123-4567';
    await elementIsStable(element);
    expect(element.value).toBe('+1 555-123-4567');

    element.value = '+1 555-987-6543';
    await elementIsStable(element);
    expect(element.value).toBe('+1 555-987-6543');
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

    element.minLength = 10;
    element.maxLength = 15;
    await elementIsStable(element);
    expect(element.minLength).toBe(10);
    expect(element.maxLength).toBe(15);
  });

  it('should handle pattern property for validation', async () => {
    await elementIsStable(element);
    expect(element.pattern).toBe(undefined);

    element.pattern = '[0-9]{3}-[0-9]{3}-[0-9]{4}';
    await elementIsStable(element);
    expect(element.pattern).toBe('[0-9]{3}-[0-9]{3}-[0-9]{4}');
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

  it('should support prefix and suffix slots', async () => {
    fixture = await createFixture(html`
      <bp-telephone>
        <bp-button-icon slot="prefix" shape="phone"></bp-button-icon>
        <bp-button-icon slot="suffix" shape="help"></bp-button-icon>
      </bp-telephone>
    `);
    element = fixture.querySelector<BpTelephone>('bp-telephone');
    await elementIsStable(element);

    const prefixSlot = element.shadowRoot.querySelector('slot[name="prefix"]');
    const suffixSlot = element.shadowRoot.querySelector('slot[name="suffix"]');
    expect(prefixSlot).toBeTruthy();
    expect(suffixSlot).toBeTruthy();
  });
});
