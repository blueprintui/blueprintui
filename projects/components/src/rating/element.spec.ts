import { html } from 'lit';
import { createFixture, removeFixture, elementIsStable, emulateClick } from '@blueprintui/test';
import { BpRating } from '@blueprintui/components/rating';
import '@blueprintui/components/include/rating.js';

describe('bp-rating', () => {
  let element: BpRating;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>rating</label>
        <bp-rating></bp-rating>
        <bp-field-message>message test</bp-field-message>
      </bp-field>
    `);

    element = fixture.querySelector<BpRating>('bp-rating');
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create the component', async () => {
    await elementIsStable(element);
    expect(customElements.get('bp-rating')).toBe(BpRating);
  });

  it('should set default properties', async () => {
    await elementIsStable(element);
    expect(element.value).toBe(0);
    expect(element.min).toBe(0);
    expect(element.max).toBe(5);
  });

  it('should have form association enabled', async () => {
    await elementIsStable(element);
    expect(BpRating.formAssociated).toBe(true);
  });

  it('should render with correct CSS parts', async () => {
    await elementIsStable(element);
    const internalPart = element.shadowRoot.querySelector('[part="internal"]');
    expect(internalPart).toBeTruthy();
  });

  it('should render correct number of icons based on max value', async () => {
    await elementIsStable(element);
    const icons = element.shadowRoot.querySelectorAll('bp-icon');
    expect(icons.length).toBe(5); // default max is 5

    element.max = 3;
    await elementIsStable(element);
    const newIcons = element.shadowRoot.querySelectorAll('bp-icon');
    expect(newIcons.length).toBe(3);
  });

  it('should render icons with correct attributes', async () => {
    await elementIsStable(element);
    const icons = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));

    icons.forEach((icon, index) => {
      expect(icon.getAttribute('value')).toBe((index + 1).toString());
      expect(icon.getAttribute('shape')).toBe('favorite');
      expect(icon.getAttribute('size')).toBe('sm');
      expect(icon.getAttribute('type')).toBe('solid');
    });
  });

  it('should update the value when a given star is clicked', async () => {
    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));
    expect(element.value).toBe(0);

    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(3);
  });

  it('should update the value when range is used for keynav selection', async () => {
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');
    expect(element.value).toBe(0);
    range.valueAsNumber = 2;
    range.dispatchEvent(new Event('input'));
    await elementIsStable(element);
    expect(element.value).toBe(2);
  });

  it('should update star selection from value', async () => {
    element.value = 3;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(3);
  });

  it('should set value to 0 if selected rating is toggled', async () => {
    element.value = 3;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(3);

    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));
    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(0);
  });

  it('should handle mouseenter events to preview rating', async () => {
    await elementIsStable(element);
    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));

    // Initially no stars should be selected
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(0);

    // Mouseenter on 3rd star should show 3 stars as selected
    stars[2].dispatchEvent(new MouseEvent('mouseenter'));
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(3);
  });

  it('should handle mouseleave events to restore actual rating', async () => {
    await elementIsStable(element);
    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));

    // Set initial value
    element.value = 2;
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(2);

    // Mouseenter on 4th star
    stars[3].dispatchEvent(new MouseEvent('mouseenter'));
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(4);

    // Mouseleave on the same star should restore to actual value
    stars[3].dispatchEvent(new MouseEvent('mouseleave'));
    await elementIsStable(element);
    expect(element.shadowRoot.querySelectorAll('bp-icon[selected]').length).toBe(2);
  });

  it('should handle input and change events', async () => {
    await elementIsStable(element);
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');

    const inputSpy = jasmine.createSpy('input');
    const changeSpy = jasmine.createSpy('change');

    element.addEventListener('input', inputSpy);
    element.addEventListener('change', changeSpy);

    range.valueAsNumber = 4;
    range.dispatchEvent(new Event('input'));
    await elementIsStable(element);

    expect(inputSpy).toHaveBeenCalled();
    expect(element.value).toBe(4);

    range.dispatchEvent(new Event('change'));
    await elementIsStable(element);
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should handle disabled state interactions and prevent selection', async () => {
    await elementIsStable(element);
    element.disabled = true;
    await elementIsStable(element);

    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));

    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(0);
  });

  it('should handle readonly state interactions and prevent selection', async () => {
    await elementIsStable(element);
    element.readOnly = true;
    await elementIsStable(element);

    const stars = Array.from(element.shadowRoot.querySelectorAll('bp-icon'));

    emulateClick(stars[2]);
    await elementIsStable(element);
    expect(element.value).toBe(0);
  });

  it('should handle min and max property changes', async () => {
    await elementIsStable(element);

    element.min = 1;
    element.max = 10;
    await elementIsStable(element);

    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');
    expect(range.min).toBe('1');
    expect(range.max).toBe('10');

    const icons = element.shadowRoot.querySelectorAll('bp-icon');
    expect(icons.length).toBe(10);
  });

  it('should handle value changes outside valid range', async () => {
    await elementIsStable(element);

    // Set value above max
    element.value = 10;
    await elementIsStable(element);
    expect(element.value).toBe(10); // Should allow it but may not display correctly

    // Set value below min
    element.value = -1;
    await elementIsStable(element);
    expect(element.value).toBe(-1); // Should allow it but may not display correctly
  });

  it('should have applied style modules', async () => {
    await elementIsStable(element);
    expect((element.constructor as typeof BpRating).styles).toBeTruthy();
    expect((element.constructor as typeof BpRating).styles.length).toBeGreaterThan(0);
  });

  it('should set control-width attribute on bp-field', async () => {
    await elementIsStable(element);
    const field = element.closest('bp-field');
    expect(field.getAttribute('control-width')).toBe('shrink');
  });

  it('should handle range input properties correctly', async () => {
    await elementIsStable(element);
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');

    expect(range.type).toBe('range');
    expect(range.role).toBe('none');
    expect(range.min).toBe('0');
    expect(range.max).toBe('5');
    expect(range.valueAsNumber).toBe(0);
    expect(range.disabled).toBe(false);
  });

  it('should update range input when value changes', async () => {
    await elementIsStable(element);
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');

    element.value = 3;
    await elementIsStable(element);
    expect(range.valueAsNumber).toBe(3);
  });

  it('should handle aria-label from composed label', async () => {
    await elementIsStable(element);
    const range = element.shadowRoot.querySelector<HTMLInputElement>('input');

    // The composedLabel should be set from the field label
    expect(range.ariaLabel).toBe('rating');
  });
});
