import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable } from '@blueprintui/test';
import { BpSelect } from '@blueprintui/components/select';
import '@blueprintui/components/include/select.js';

describe('bp-select', () => {
  let element: BpSelect;
  let elementTwo: BpSelect;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-select>
        <bp-option value="1">one</bp-option>
        <bp-option value="2">two</bp-option>
        <bp-option value="3">three</bp-option>
      </bp-select>
      <bp-select>
        <bp-option value="1">one</bp-option>
        <bp-option value="2" selected>two</bp-option>
        <bp-option value="3">three</bp-option>
      </bp-select>
    `);

    element = fixture.querySelectorAll<BpSelect>('bp-select')[0];
    elementTwo = fixture.querySelectorAll<BpSelect>('bp-select')[1];
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
});
