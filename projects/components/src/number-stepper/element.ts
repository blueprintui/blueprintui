import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/number-stepper.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>Quantity</label>
 *   <bp-number-stepper value="1" min="0" max="10" step="1"></bp-number-stepper>
 *   <bp-field-message>Select quantity</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary A number input with explicit increment/decrement buttons in a horizontal minus-input-plus layout
 * @element bp-number-stepper
 * @since 2.11.0
 * @slot decrement - Custom content for decrement button (replaces minus icon)
 * @slot increment - Custom content for increment button (replaces plus icon)
 * @cssprop --background - Background color of input field
 * @cssprop --color - Text color
 * @cssprop --border - Border style
 * @cssprop --border-radius - Border radius
 * @cssprop --outline - Outline style (focus state)
 * @cssprop --outline-offset - Outline offset
 * @cssprop --padding - Input field padding
 * @cssprop --font-size - Font size
 * @cssprop --height - Component height
 * @cssprop --width - Component width
 * @cssprop --min-width - Minimum width
 * @cssprop --gap - Gap between elements
 * @cssprop --text-align - Text alignment in input field
 * @event {InputEvent} input - occurs when the value changes (real-time, during typing)
 * @event {InputEvent} change - occurs when value is committed (blur, enter, or button click)
 */
export class BpNumberStepper extends FormControl {
  /** current value of the number input */
  @property({ type: Number }) accessor value = 0;

  /** granularity of value (default: 1) */
  @property({ type: Number }) accessor step = 1;

  /** allow manual typing in the input field (default: true) */
  @property({ type: Boolean, attribute: 'allow-typing' }) accessor allowTyping = true;

  /** enable hold-to-repeat on stepper buttons (default: false) */
  @property({ type: Boolean, attribute: 'continuous-stepping' }) accessor continuousStepping = false;

  /** delay in ms before continuous stepping starts (default: 500) */
  @property({ type: Number, attribute: 'stepper-delay' }) accessor stepperDelay = 500;

  /** interval in ms for continuous stepping (default: 100) */
  @property({ type: Number, attribute: 'stepper-interval' }) accessor stepperInterval = 100;

  static styles = [baseStyles, styles];

  private stepTimeout: number | null = null;
  private stepIntervalId: number | null = null;

  protected get input() {
    return this.shadowRoot.querySelector('input');
  }

  get valueAsNumber() {
    return typeof this.value === 'number' ? this.value : parseFloat(this.value as string) || 0;
  }

  set valueAsNumber(value: number) {
    this.value = value;
  }

  render() {
    const decrementDisabled = this.disabled || (this.min !== undefined && this.valueAsNumber <= this.min);
    const incrementDisabled = this.disabled || (this.max !== undefined && this.valueAsNumber >= this.max);

    return html`
      <div role="presentation" part="internal">
        <bp-button-icon
          part="decrement"
          shape="minus"
          aria-label="decrement"
          action="inline"
          ?disabled=${decrementDisabled}
          @click=${this.#handleDecrement}
          @mousedown=${this.#handleDecrementStart}
          @mouseup=${this.#handleStepEnd}
          @mouseleave=${this.#handleStepEnd}
          @touchstart=${this.#handleDecrementStart}
          @touchend=${this.#handleStepEnd}>
        </bp-button-icon>
        <input
          input
          type="number"
          placeholder=${this.placeholder}
          .ariaLabel=${this.composedLabel}
          .value=${this.value.toString()}
          .disabled=${this.disabled}
          .readOnly=${!this.allowTyping || this.readonly}
          ?required=${this.required}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          role="spinbutton"
          aria-valuemin=${ifDefined(this.min)}
          aria-valuemax=${ifDefined(this.max)}
          aria-valuenow=${this.valueAsNumber}
          @change=${this.onChange}
          @input=${this.onInput} />
        <bp-button-icon
          part="increment"
          shape="add"
          aria-label="increment"
          action="inline"
          ?disabled=${incrementDisabled}
          @click=${this.#handleIncrement}
          @mousedown=${this.#handleIncrementStart}
          @mouseup=${this.#handleStepEnd}
          @mouseleave=${this.#handleStepEnd}
          @touchstart=${this.#handleIncrementStart}
          @touchend=${this.#handleStepEnd}>
          <slot name="increment"></slot>
        </bp-button-icon>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clearStepTimers();
  }

  /** Increments value by step (optional multiplier) */
  stepUp(n = 1) {
    const currentValue = this.valueAsNumber;
    const newValue = currentValue + this.step * n;
    const clampedValue = this.max !== undefined ? Math.min(newValue, this.max) : newValue;
    this.value = clampedValue;
    this.#dispatchChangeEvent();
  }

  /** Decrements value by step (optional multiplier) */
  stepDown(n = 1) {
    const currentValue = this.valueAsNumber;
    const newValue = currentValue - this.step * n;
    const clampedValue = this.min !== undefined ? Math.max(newValue, this.min) : newValue;
    this.value = clampedValue;
    this.#dispatchChangeEvent();
  }

  #handleIncrement(e: Event) {
    e.preventDefault();
    if (!this.disabled && (this.max === undefined || this.valueAsNumber < this.max)) {
      this.stepUp();
    }
  }

  #handleDecrement(e: Event) {
    e.preventDefault();
    if (!this.disabled && (this.min === undefined || this.valueAsNumber > this.min)) {
      this.stepDown();
    }
  }

  #handleIncrementStart(e: Event) {
    if (!this.continuousStepping || this.disabled) {
      return;
    }
    e.preventDefault();
    this.#clearStepTimers();
    this.stepTimeout = window.setTimeout(() => {
      this.stepIntervalId = window.setInterval(() => {
        if (this.max === undefined || this.valueAsNumber < this.max) {
          this.stepUp();
        } else {
          this.#clearStepTimers();
        }
      }, this.stepperInterval);
    }, this.stepperDelay);
  }

  #handleDecrementStart(e: Event) {
    if (!this.continuousStepping || this.disabled) {
      return;
    }
    e.preventDefault();
    this.#clearStepTimers();
    this.stepTimeout = window.setTimeout(() => {
      this.stepIntervalId = window.setInterval(() => {
        if (this.min === undefined || this.valueAsNumber > this.min) {
          this.stepDown();
        } else {
          this.#clearStepTimers();
        }
      }, this.stepperInterval);
    }, this.stepperDelay);
  }

  #handleStepEnd(e: Event) {
    if (!this.continuousStepping) {
      return;
    }
    e.preventDefault();
    this.#clearStepTimers();
  }

  #clearStepTimers() {
    if (this.stepTimeout !== null) {
      clearTimeout(this.stepTimeout);
      this.stepTimeout = null;
    }
    if (this.stepIntervalId !== null) {
      clearInterval(this.stepIntervalId);
      this.stepIntervalId = null;
    }
  }

  #dispatchChangeEvent() {
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }
}
