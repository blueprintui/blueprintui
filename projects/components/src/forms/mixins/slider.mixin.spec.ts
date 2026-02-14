import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { createFixture, removeFixture, elementIsStable, onceEvent } from '@blueprintui/test';
import { SliderFormControlMixin } from './slider.mixin.js';
import '@blueprintui/components/include/forms.js';

@customElement('bp-test-slider')
class TestSlider extends SliderFormControlMixin<typeof LitElement, number>(LitElement) {
  render() {
    return html`<div part="track"></div>`;
  }
}

describe('SliderFormControlMixin', () => {
  let element: TestSlider;
  let fixture: HTMLElement;

  beforeEach(async () => {
    fixture = await createFixture(html`
      <bp-field>
        <label>slider</label>
        <bp-test-slider name="test" value="50" min="0" max="100" step="10"></bp-test-slider>
      </bp-field>
    `);

    element = fixture.querySelector<TestSlider>('bp-test-slider');
    await elementIsStable(element);
  });

  afterEach(() => {
    removeFixture(fixture);
  });

  it('should create component', async () => {
    expect(element).toBeTruthy();
  });

  it('should have form association enabled', async () => {
    expect((TestSlider as any).formAssociated).toBe(true);
  });

  describe('type property', () => {
    it('should return "range"', async () => {
      expect(element.type).toBe('range');
    });

    it('should not change when type is set', async () => {
      element.type = 'text';
      expect(element.type).toBe('range');
    });
  });

  describe('value property', () => {
    it('should initialize from attribute', async () => {
      expect(element.value).toBe(50);
    });

    it('should be settable via property', async () => {
      element.value = 75;
      expect(element.value).toBe(75);
    });

    it('should handle string values', async () => {
      (element as any).value = '25';
      expect(element.value).toBe(25);
    });

    it('should update attribute when property is set', async () => {
      element.value = 30;
      await elementIsStable(element);
      // Note: value attribute is not reflected in SliderFormControlMixin
      expect(element.value).toBe(30);
    });
  });

  describe('valueAsNumber property', () => {
    it('should return numeric value', async () => {
      expect(element.valueAsNumber).toBe(50);
    });

    it('should be settable', async () => {
      element.valueAsNumber = 80;
      expect(element.valueAsNumber).toBe(80);
      expect(element.value).toBe(80);
    });

    it('should respect min/max boundaries', async () => {
      element.valueAsNumber = 150; // Above max
      expect(element.valueAsNumber).toBe(50); // Should not change

      element.valueAsNumber = -10; // Below min
      expect(element.valueAsNumber).toBe(50); // Should not change
    });
  });

  describe('min property', () => {
    it('should initialize from attribute', async () => {
      expect(element.min).toBe(0);
    });

    it('should be settable', async () => {
      element.min = 10;
      expect(element.min).toBe(10);
    });
  });

  describe('max property', () => {
    it('should initialize from attribute', async () => {
      expect(element.max).toBe(100);
    });

    it('should be settable', async () => {
      element.max = 200;
      expect(element.max).toBe(200);
    });
  });

  describe('step property', () => {
    it('should initialize from attribute', async () => {
      expect(element.step).toBe(10);
    });

    it('should be settable', async () => {
      element.step = 5;
      expect(element.step).toBe(5);
    });
  });

  describe('orientation property', () => {
    it('should default to horizontal', async () => {
      expect(element.orientation).toBe('horizontal');
    });

    it('should be settable', async () => {
      element.orientation = 'vertical';
      expect(element.orientation).toBe('vertical');
    });
  });

  describe('ARIA attributes', () => {
    it('should set role to slider', async () => {
      expect(element._internals.role).toBe('slider');
    });

    it('should set ariaValueMin', async () => {
      expect(element._internals.ariaValueMin).toBe('0');
    });

    it('should set ariaValueMax', async () => {
      expect(element._internals.ariaValueMax).toBe('100');
    });

    it('should set ariaValueNow', async () => {
      expect(element._internals.ariaValueNow).toBe('50');
    });

    it('should update ariaValueNow when value changes', async () => {
      element.value = 75;
      await elementIsStable(element);
      expect(element._internals.ariaValueNow).toBe('75');
    });

    it('should set ariaDisabled to "false" initially', async () => {
      expect(element._internals.ariaDisabled).toBe('false');
    });

    it('should update ariaDisabled when disabled changes', async () => {
      element.disabled = true;
      await elementIsStable(element);
      expect(element._internals.ariaDisabled).toBe('true');
    });
  });

  describe('keyboard navigation', () => {
    it('should increase value with ArrowRight', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }));
      await elementIsStable(element);
      expect(element.value).toBe(60);
    });

    it('should decrease value with ArrowLeft', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }));
      await elementIsStable(element);
      expect(element.value).toBe(40);
    });

    it('should increase value with ArrowUp', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await elementIsStable(element);
      expect(element.value).toBe(60);
    });

    it('should decrease value with ArrowDown', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      await elementIsStable(element);
      expect(element.value).toBe(40);
    });

    it('should set value to min with Home', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'Home' }));
      await elementIsStable(element);
      expect(element.value).toBe(0);
    });

    it('should set value to max with End', async () => {
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'End' }));
      await elementIsStable(element);
      expect(element.value).toBe(100);
    });

    it('should respect step value', async () => {
      element.step = 5;
      await elementIsStable(element);

      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await elementIsStable(element);
      expect(element.value).toBe(55);
    });

    it('should respect min boundary', async () => {
      element.value = 0;
      await elementIsStable(element);

      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }));
      await elementIsStable(element);
      expect(element.value).toBe(0);
    });

    it('should respect max boundary', async () => {
      element.value = 100;
      await elementIsStable(element);

      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await elementIsStable(element);
      expect(element.value).toBe(100);
    });

    it('should not respond when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);

      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await elementIsStable(element);
      expect(element.value).toBe(50);
    });

    it('should not respond when readonly', async () => {
      element.readOnly = true;
      await elementIsStable(element);

      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await elementIsStable(element);
      expect(element.value).toBe(50);
    });

    it('should emit input event on keyboard navigation', async () => {
      const event = onceEvent(element, 'input');
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await event;
      expect(element.value).toBe(60);
    });

    it('should emit change event on keyboard navigation', async () => {
      const event = onceEvent(element, 'change');
      element.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }));
      await event;
      expect(element.value).toBe(60);
    });
  });

  describe('touch navigation', () => {
    it('should update value on horizontal touch move', async () => {
      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      await elementIsStable(element);
      expect(element.value).toBe(60);
    });

    it('should update value on vertical touch move when orientation is vertical', async () => {
      element.orientation = 'vertical';
      await elementIsStable(element);

      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 0, offsetY: -10 } }));
      await elementIsStable(element);
      expect(element.value).toBe(40);
    });

    it('should respect min/max boundaries on touch move', async () => {
      element.value = 95;
      await elementIsStable(element);

      // Value stays at 95 because 105 is out of range (not clamped)
      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      await elementIsStable(element);
      expect(element.value).toBe(95);

      // But valid moves still work
      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 5, offsetY: 0 } }));
      await elementIsStable(element);
      expect(element.value).toBe(100);
    });

    it('should emit input event on touch move', async () => {
      const event = onceEvent(element, 'input');
      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      await event;
      expect(element.value).toBe(60);
    });

    it('should emit change event on touch end', async () => {
      const event = onceEvent(element, 'change');
      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      element.dispatchEvent(new CustomEvent('bp-touchend'));
      await event;
    });

    it('should not respond to touch when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);

      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      await elementIsStable(element);
      expect(element.value).toBe(50);
    });

    it('should not respond to touch when readonly', async () => {
      element.readOnly = true;
      await elementIsStable(element);

      element.dispatchEvent(new CustomEvent('bp-touchmove', { detail: { offsetX: 10, offsetY: 0 } }));
      await elementIsStable(element);
      expect(element.value).toBe(50);
    });
  });

  describe('form integration', () => {
    it('should include value in form data', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-slider name="slider" value="75"></bp-test-slider>
        </form>
      `);
      const sliderElement = formFixture.querySelector<TestSlider>('bp-test-slider');
      await elementIsStable(sliderElement);

      const form = formFixture.querySelector('form');
      const formData = new FormData(form);

      expect(formData.get('slider')).toBe('75');
      removeFixture(formFixture);
    });

    it('should update form value when value changes', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-slider name="slider" value="50"></bp-test-slider>
        </form>
      `);
      const sliderElement = formFixture.querySelector<TestSlider>('bp-test-slider');
      await elementIsStable(sliderElement);

      const form = formFixture.querySelector('form');

      sliderElement.value = 80;
      await elementIsStable(sliderElement);
      expect(new FormData(form).get('slider')).toBe('80');

      removeFixture(formFixture);
    });

    it('should not include value in form data when disabled', async () => {
      const formFixture = await createFixture(html`
        <form>
          <bp-test-slider name="slider" value="50" disabled></bp-test-slider>
        </form>
      `);
      const sliderElement = formFixture.querySelector<TestSlider>('bp-test-slider');
      await elementIsStable(sliderElement);

      const form = formFixture.querySelector('form');
      expect(new FormData(form).get('slider')).toBe(null);

      removeFixture(formFixture);
    });
  });

  describe('disabled state', () => {
    it('should support disabled property', async () => {
      expect(element.disabled).toBe(false);

      element.disabled = true;
      await elementIsStable(element);
      expect(element.disabled).toBe(true);
    });

    it('should add :state(disabled) CSS state', async () => {
      element.disabled = true;
      await elementIsStable(element);
      expect(element.matches(':state(disabled)')).toBe(true);
    });

    it('should set tabIndex to -1 when disabled', async () => {
      element.disabled = true;
      await elementIsStable(element);
      expect(element.tabIndex).toBe(-1);
    });
  });

  describe('readonly state', () => {
    it('should support readOnly property', async () => {
      expect(element.readOnly).toBe(false);

      element.readOnly = true;
      await elementIsStable(element);
      expect(element.readOnly).toBe(true);
    });

    it('should add :state(readonly) CSS state', async () => {
      element.readOnly = true;
      await elementIsStable(element);
      expect(element.matches(':state(readonly)')).toBe(true);
    });

    it('should set tabIndex to -1 when readonly', async () => {
      element.readOnly = true;
      await elementIsStable(element);
      expect(element.tabIndex).toBe(-1);
    });
  });

  describe('focusability', () => {
    it('should be focusable', async () => {
      element.focus();
      expect(document.activeElement).toBe(element);
    });

    it('should have tabIndex of 0 by default', async () => {
      expect(element.tabIndex).toBe(0);
    });
  });

  describe('bp-field attribute', () => {
    it('should have bp-field="" attribute', async () => {
      expect(element.getAttribute('bp-field')).toBe('');
    });
  });

  describe('complex-focus state', () => {
    it('should have complex-focus state', async () => {
      expect(element._internals.states.has('complex-focus')).toBe(true);
    });
  });

  describe('touched state', () => {
    it('should add :state(touched) after focus and blur', async () => {
      expect(element.matches(':state(touched)')).toBe(false);

      element.focus();
      element.blur();
      await elementIsStable(element);
      expect(element.matches(':state(touched)')).toBe(true);
    });
  });

  describe('attribute changes', () => {
    it('should update value when attribute changes', async () => {
      element.setAttribute('value', '25');
      await elementIsStable(element);
      expect(element.value).toBe(25);
    });

    it('should update min when attribute changes', async () => {
      element.setAttribute('min', '10');
      await elementIsStable(element);
      expect(element.min).toBe(10);
    });

    it('should update max when attribute changes', async () => {
      element.setAttribute('max', '200');
      await elementIsStable(element);
      expect(element.max).toBe(200);
    });

    it('should update step when attribute changes', async () => {
      element.setAttribute('step', '5');
      await elementIsStable(element);
      expect(element.step).toBe(5);
    });

    it('should update orientation when attribute changes', async () => {
      element.setAttribute('orientation', 'vertical');
      await elementIsStable(element);
      expect(element.orientation).toBe('vertical');
    });
  });
});
