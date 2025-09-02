import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { elementIsStable, createFixture, removeFixture, onceEvent } from '@blueprintui/test';
import { SliderControl, TypeFormSliderController, TypeFormControlController } from '@blueprintui/components/forms';

interface TypeFormSliderControllerTestElement extends SliderControl {} // eslint-disable-line

@customElement('type-form-slider-test-element')
class TypeFormSliderControllerTestElement extends LitElement {
  static formAssociated = true;

  @property({ type: String }) accessor value: string | FormData = '';

  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Boolean }) accessor readonly: boolean;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) accessor min = 0;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) accessor max = 100;

  /** number that specifies the granularity that the value */
  @property({ type: Number }) accessor step = 1;

  @property({ type: String }) accessor orientation: 'vertical' | 'horizontal' = 'horizontal';

  get valueAsNumber() {
    return parseFloat(this.value as string);
  }

  set valueAsNumber(value: number) {
    this.value = `${value}`;
  }

  typeFormControlController = new TypeFormControlController(this);

  typeFormSliderController = new TypeFormSliderController(this);
}

describe('type-form-slider.controller', () => {
  let element: TypeFormSliderControllerTestElement;
  let fixture: HTMLElement;
  let form: HTMLFormElement;

  beforeEach(async () => {
    fixture = await createFixture(
      html`<form>
        <type-form-slider-test-element
          tabindex="0"
          name="test-slider"
          value="50"
          min="0"
          max="100"
          step="10"></type-form-slider-test-element>
      </form>`
    );
    element = fixture.querySelector<TypeFormSliderControllerTestElement>('type-form-slider-test-element');
    form = fixture.querySelector('form');
    await element.updateComplete;
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should register element', async () => {
    await elementIsStable(element);
    expect(customElements.get('type-form-slider-test-element')).toBe(TypeFormSliderControllerTestElement);
  });

  it('should add field marker attribute', async () => {
    await elementIsStable(element);
    expect(element.getAttribute('bp-field')).toBe('');
  });

  it('should initialize component to have role slider', async () => {
    await elementIsStable(element);
    expect(element._internals.role).toBe('slider');
  });

  it('should initialize component to be focusable', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);
    expect(element.tabIndex).toBe(0);
  });

  it('should update tabindex based on readonly and disabled states', async () => {
    await elementIsStable(element);
    expect(element.disabled).toBe(undefined);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should mark element with :state(complex-focus) state', async () => {
    await elementIsStable(element);
    expect(element.matches(':state(complex-focus)')).toBe(true);
  });

  it('should update aria-disabled based on disabled state', async () => {
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('false');

    element.disabled = true;
    await elementIsStable(element);
    expect(element._internals.ariaDisabled).toBe('true');
  });

  it('should set the form value if changed', async () => {
    await elementIsStable(element);
    expect(element.checked).toBe(undefined);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.value = '60';
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.value = '10';
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '10' });
  });

  it('should set the form value via keyboard input', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '0' });

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '100' });
  });

  it('should emit a input event on touch move', async () => {
    const event = onceEvent(element, 'input');
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('60');
  });

  it('should emit a change event on touch end', async () => {
    const event = onceEvent(element, 'change');
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    element.dispatchEvent(new CustomEvent('bp-touchend'));
    await elementIsStable(element);
    expect((await event)?.target.value).toBe('60');
  });

  it('should not change value if the touch event is not the correct orientation', async () => {
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });
  });

  it('should set the form value via touch input', async () => {
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '60' });

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });

    element.orientation = 'vertical';
    await elementIsStable(element);

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: -10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '40' });

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: 10 } }));
    await elementIsStable(element);
    expect(Object.fromEntries(new FormData(form) as any)).toEqual({ 'test-slider': '50' });
  });

  it('should not trigger any value updates if disabled or readonly', async () => {
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.disabled = true;
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.disabled = false;
    element.readonly = true;
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);
  });

  it('should prevent default behavior for keyboard events except Tab', async () => {
    await elementIsStable(element);

    const arrowUpEvent = new KeyboardEvent('keydown', { code: 'ArrowUp' });
    const preventDefaultSpy = spyOn(arrowUpEvent, 'preventDefault');
    element.dispatchEvent(arrowUpEvent);
    expect(preventDefaultSpy).toHaveBeenCalled();

    const arrowDownEvent = new KeyboardEvent('keydown', { code: 'ArrowDown' });
    const preventDefaultSpy2 = spyOn(arrowDownEvent, 'preventDefault');
    element.dispatchEvent(arrowDownEvent);
    expect(preventDefaultSpy2).toHaveBeenCalled();

    const homeEvent = new KeyboardEvent('keydown', { code: 'Home' });
    const preventDefaultSpy3 = spyOn(homeEvent, 'preventDefault');
    element.dispatchEvent(homeEvent);
    expect(preventDefaultSpy3).toHaveBeenCalled();

    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const preventDefaultSpy4 = spyOn(tabEvent, 'preventDefault');
    element.dispatchEvent(tabEvent);
    expect(preventDefaultSpy4).not.toHaveBeenCalled();
  });

  it('should not trigger keyboard interactions when readonly', async () => {
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.readonly = true;
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);
  });

  it('should not trigger touch interactions when readonly', async () => {
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.readonly = true;
    await elementIsStable(element);

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    element.dispatchEvent(new CustomEvent('bp-touchend'));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);
  });

  it('should validate value range and prevent out-of-bounds values', async () => {
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    // Try to set value below min through keyboard interaction
    element.valueAsNumber = 0; // Set to min first
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(0); // Should stay at min

    // Try to set value above max through keyboard interaction
    element.valueAsNumber = 100; // Set to max first
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(100); // Should stay at max

    // Valid values should work through keyboard interaction
    element.valueAsNumber = 50; // Set to middle
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(60); // Should increment by step

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50); // Should decrement by step
  });

  it('should handle edge cases at min and max boundaries', async () => {
    await elementIsStable(element);

    // Set to min and try to go lower
    element.valueAsNumber = 0;
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(0); // Should stay at min

    // Set to max and try to go higher
    element.valueAsNumber = 100;
    await elementIsStable(element);
    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(100); // Should stay at max
  });

  it('should handle different step values correctly', async () => {
    await elementIsStable(element);
    element.step = 5;
    await elementIsStable(element);

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(55); // 50 + 5

    element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50); // 55 - 5
  });

  it('should round touch move values to integers', async () => {
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    // Touch move with fractional offset should be rounded
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 5.7 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(56); // 50 + 5.7 rounded to 6

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: -3.2 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(53); // 56 - 3.2 rounded to -3

    // Test edge case with very small fractional values
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 0.1 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(53); // 53 + 0.1 rounded to 0, so no change

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 0.9 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(54); // 53 + 0.9 rounded to 1
  });

  it('should handle vertical orientation touch events correctly', async () => {
    await elementIsStable(element);
    element.orientation = 'vertical';
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);

    // Vertical orientation should use offsetY
    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: 10 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(60);

    element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetY: -10 } }));
    await elementIsStable(element);
    expect(element.valueAsNumber).toEqual(50);
  });

  it('should update tabindex when readonly state changes', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.readonly = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });

  it('should handle both disabled and readonly states for tabindex', async () => {
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);

    element.disabled = true;
    element.readonly = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = true;
    element.readonly = true;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(-1);

    element.disabled = false;
    element.readonly = false;
    await elementIsStable(element);
    expect(element.tabIndex).toBe(0);
  });
});
