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

      this.#initFromAttributes();

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

    #initFromAttributes() {
      this.#initValueAttribute();
      this.#initNumericAttributes();
      if (this.hasAttribute('orientation')) {
        this.#orientation = (this.getAttribute('orientation') as 'horizontal' | 'vertical') ?? 'horizontal';
      }
    }

    #initValueAttribute() {
      if (!this.hasAttribute('value')) return;
      const val = parseFloat(this.getAttribute('value') ?? '0');
      if (!isNaN(val)) {
        this.#value = val;
      }
    }

    #initNumericAttributes() {
      const numericSetters: Array<[string, string, (v: number) => void]> = [
        ['min', '0', v => (this.#min = v)],
        ['max', '100', v => (this.#max = v)],
        ['step', '1', v => (this.#step = v)]
      ];
      numericSetters.forEach(([attr, fallback, setter]) => {
        if (this.hasAttribute(attr)) {
          setter(parseFloat(this.getAttribute(attr) ?? fallback));
        }
      });
    }

    disconnectedCallback() {
      super.disconnectedCallback?.();
      this.removeEventListener('keydown', this.#boundKeydownHandler);
      this.removeEventListener('bp-touchmove', this.#boundTouchmoveHandler as EventListener);
      this.removeEventListener('bp-touchend', this.#boundTouchendHandler as EventListener);
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
      const handled = this.#applySliderAttribute(name, newValue);

      if (!handled && super.attributeChangedCallback) {
        super.attributeChangedCallback(name, oldValue, newValue);
      }

      // Update tabIndex and aria when disabled or readonly changes
      if (name === 'disabled' || name === 'readonly') {
        this.#updateTabIndex();
        this._internals.ariaDisabled = this.disabled ? 'true' : 'false';
      }
    }

    #applySliderAttribute(name: string, newValue: string | null): boolean {
      if (name === 'value') {
        this.#applyValueAttribute(newValue);
        return true;
      }

      const numericDefaults: Record<string, [string, (v: number) => void]> = {
        min: ['0', v => (this.#min = v)],
        max: ['100', v => (this.#max = v)],
        step: ['1', v => (this.#step = v)]
      };

      if (numericDefaults[name]) {
        const [fallback, setter] = numericDefaults[name];
        setter(parseFloat(newValue ?? fallback));
        this.requestUpdate?.();
        return true;
      }

      if (name === 'orientation') {
        this.#orientation = (newValue as 'horizontal' | 'vertical') ?? 'horizontal';
        this.requestUpdate?.();
        return true;
      }

      return false;
    }

    #applyValueAttribute(newValue: string | null) {
      const val = parseFloat(newValue ?? '0');
      if (!isNaN(val)) {
        this.#value = val;
        this.#updateFormValue();
        this.requestUpdate?.();
      }
    }

    /**
     * Handles keyboard navigation for the slider control.
     */
    #handleKeydown(e: KeyboardEvent) {
      if (this.disabled || this.readOnly) {
        return;
      }

      const newValue = this.#computeKeydownValue(e.code);

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

    #computeKeydownValue(code: string): number {
      const deltas: Record<string, number> = {
        ArrowLeft: -this.#step,
        ArrowDown: -this.#step,
        ArrowRight: this.#step,
        ArrowUp: this.#step
      };
      if (code in deltas) {
        return this.#value + deltas[code];
      }
      if (code === 'Home') return this.#min;
      if (code === 'End') return this.#max;
      return this.#value;
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
