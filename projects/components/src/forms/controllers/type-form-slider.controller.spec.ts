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
});
