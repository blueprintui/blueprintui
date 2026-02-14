import { InteractionTouchController } from '@blueprintui/components/internals';
import { FormControlInstance, FormControlMixin, FormControlValue } from './form-control.mixin.js';

interface FormControlSliderInstance extends FormControlInstance {
  value: number;
  valueAsNumber: number;
  orientation: 'horizontal' | 'vertical';
}

export interface SliderFormControlMixin {
  new (...args: any[]): FormControlSliderInstance;
  formAssociated: boolean;
  readonly observedAttributes: string[];
}

type Constructor = new (...args: any[]) => HTMLElement & {
  connectedCallback?(): void;
  disconnectedCallback?(): void;
  attributeChangedCallback?(name: string, oldValue: string | null, newValue: string | null): void;
  requestUpdate?(name?: string, oldValue?: unknown): void;
  updateComplete?: Promise<boolean>;
} & {
  observedAttributes?: string[];
};

/**
 * Mixin that extends FormControlMixin with slider-specific functionality.
 * Provides native HTMLInputElement[type=range]-like behavior for custom slider components.
 *
 * Features:
 * - value: Numeric value within min/max range
 * - min/max: Define the allowed value boundaries
 * - step: Granularity of value changes
 * - orientation: horizontal or vertical layout
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Touch/pointer drag support
 * - Form value handling
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/slider/
 */
export function SliderFormControlMixin<TBase extends Constructor, T extends FormControlValue>(
  SuperClass: TBase
): TBase & SliderFormControlMixin {
  const Base = FormControlMixin<TBase, T>(SuperClass);

  return class SliderBase extends Base {
    #value = 0;
    #min = 0;
    #max = 100;
    #step = 1;
    #orientation: 'horizontal' | 'vertical' = 'horizontal';
    #boundKeydownHandler = this.#handleKeydown.bind(this);
    #boundTouchmoveHandler = this.#handleTouchmove.bind(this);
    #boundTouchendHandler = this.#handleTouchend.bind(this);

    static get observedAttributes() {
      return super.observedAttributes.concat(['min', 'max', 'step', 'orientation']);
    }

    /**
     * Returns the type of the slider element.
     */
    get type(): string {
      return 'range';
    }

    set type(_value: string) {
      // Slider type is fixed
    }

    /**
     * The current numeric value of the slider control.
     */
    get value(): T {
      return this.#value as T;
    }

    set value(val: T) {
      const numVal = typeof val === 'string' ? parseFloat(val) : (val as number);
      if (!isNaN(numVal)) {
        this.#value = numVal;
        this.#updateFormValue();
        this.requestUpdate?.();
      }
    }

    /**
     * The current value as a number.
     */
    get valueAsNumber(): number {
      return this.#value;
    }

    set valueAsNumber(val: number) {
      if (this.#validRange(val)) {
        this.#value = val;
        this.#updateFormValue();
        this.requestUpdate?.();
      }
    }

    /**
     * The minimum allowed value.
     */
    get min(): number {
      return this.#min;
    }

    set min(val: number) {
      this.#min = val;
      this.requestUpdate?.();
    }

    /**
     * The maximum allowed value.
     */
    get max(): number {
      return this.#max;
    }

    set max(val: number) {
      this.#max = val;
      this.requestUpdate?.();
    }

    /**
     * The granularity of value changes.
     */
    get step(): number {
      return this.#step;
    }

    set step(val: number) {
      this.#step = val;
      this.requestUpdate?.();
    }

    /**
     * The orientation of the slider (horizontal or vertical).
     */
    get orientation(): 'horizontal' | 'vertical' {
      return this.#orientation;
    }

    set orientation(val: 'horizontal' | 'vertical') {
      this.#orientation = val;
      this.requestUpdate?.();
    }

    connectedCallback() {
      super.connectedCallback?.();
      this.setAttribute('bp-field', '');
      this._internals.role = 'slider';
      this._internals.states.add('complex-focus');
      this._internals.ariaDisabled = this.disabled ? 'true' : 'false';

      // Initialize from attributes on connect
      if (this.hasAttribute('value')) {
        const val = parseFloat(this.getAttribute('value') ?? '0');
        if (!isNaN(val)) {
          this.#value = val;
        }
      }
      if (this.hasAttribute('min')) {
        this.#min = parseFloat(this.getAttribute('min') ?? '0');
      }
      if (this.hasAttribute('max')) {
        this.#max = parseFloat(this.getAttribute('max') ?? '100');
      }
      if (this.hasAttribute('step')) {
        this.#step = parseFloat(this.getAttribute('step') ?? '1');
      }
      if (this.hasAttribute('orientation')) {
        this.#orientation = (this.getAttribute('orientation') as 'horizontal' | 'vertical') ?? 'horizontal';
      }

      this.#updateFormValue();
      this.#updateTabIndex();
      this.#updateAriaValues();

      // Initialize touch controller for drag support (controller self-registers)
      new InteractionTouchController(this as any);

      // Event listeners
      this.addEventListener('keydown', this.#boundKeydownHandler);
      this.addEventListener('bp-touchmove', this.#boundTouchmoveHandler as EventListener);
      this.addEventListener('bp-touchend', this.#boundTouchendHandler as EventListener);
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.removeEventListener('keydown', this.#boundKeydownHandler);
      this.removeEventListener('bp-touchmove', this.#boundTouchmoveHandler as EventListener);
      this.removeEventListener('bp-touchend', this.#boundTouchendHandler as EventListener);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      if (name === 'value') {
        const val = parseFloat(newValue ?? '0');
        if (!isNaN(val)) {
          this.#value = val;
          this.#updateFormValue();
          this.requestUpdate?.();
        }
      } else if (name === 'min') {
        this.#min = parseFloat(newValue ?? '0');
        this.requestUpdate?.();
      } else if (name === 'max') {
        this.#max = parseFloat(newValue ?? '100');
        this.requestUpdate?.();
      } else if (name === 'step') {
        this.#step = parseFloat(newValue ?? '1');
        this.requestUpdate?.();
      } else if (name === 'orientation') {
        this.#orientation = (newValue as 'horizontal' | 'vertical') ?? 'horizontal';
        this.requestUpdate?.();
      } else if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, oldValue, newValue);
      }

      // Update tabIndex and aria when disabled or readonly changes
      if (name === 'disabled' || name === 'readonly') {
        this.#updateTabIndex();
        this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
      }
    }

    /**
     * Handles keyboard navigation for the slider control.
     */
    #handleKeydown(e: KeyboardEvent) {
      if (this.disabled || this.readOnly) {
        return;
      }

      let newValue = this.#value;

      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        newValue -= this.#step;
      } else if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        newValue += this.#step;
      } else if (e.code === 'Home') {
        newValue = this.#min;
      } else if (e.code === 'End') {
        newValue = this.#max;
      }

      if (this.#validRange(newValue) && newValue !== this.#value) {
        this.#value = newValue;
        this.#updateFormValue();
        this.requestUpdate?.();
        this.#emitInput();
        this.#emitChange();
      }

      // Prevent default for all keys except Tab
      if (e.code !== 'Tab') {
        e.preventDefault();
      }
    }

    /**
     * Handles touch/pointer drag movement.
     */
    #handleTouchmove(e: CustomEvent<{ offsetX: number; offsetY: number }>) {
      if (this.disabled || this.readOnly) {
        return;
      }

      const offset = this.#orientation === 'horizontal' ? e.detail.offsetX : e.detail.offsetY;
      const newValue = parseFloat((this.#value + offset).toFixed(0));

      if (this.#validRange(newValue)) {
        this.#value = newValue;
        this.#updateFormValue();
        this.requestUpdate?.();
        this.#emitInput();
      }
    }

    /**
     * Handles touch/pointer drag end.
     */
    #handleTouchend() {
      if (this.disabled || this.readOnly) {
        return;
      }

      this.#emitChange();
    }

    /**
     * Checks if a value is within the valid range.
     */
    #validRange(value: number): boolean {
      return value <= this.#max && value >= this.#min;
    }

    /**
     * Updates the form value.
     */
    #updateFormValue() {
      this._internals.setFormValue(`${this.#value}`);
      this.#updateAriaValues();
    }

    /**
     * Updates ARIA value properties for slider semantics.
     */
    #updateAriaValues() {
      this._internals.ariaValueMin = `${this.#min}`;
      this._internals.ariaValueMax = `${this.#max}`;
      this._internals.ariaValueNow = `${this.#value}`;
    }

    /**
     * Updates tabIndex based on disabled/readonly state.
     */
    #updateTabIndex() {
      this.tabIndex = this.disabled || this.readOnly ? -1 : 0;
    }

    /**
     * Emits an input event.
     */
    #emitInput() {
      this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, data: `${this.#value}` }));
    }

    /**
     * Emits a change event.
     */
    #emitChange() {
      this.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true }));
    }
  } as any;
}
