import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { FormControlMixin } from '@blueprintui/components/forms';
import { baseStyles, I18nService, I18nStrings } from '@blueprintui/components/internals';
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
export class BpNumberStepper extends FormControlMixin(LitElement) {
  /** enable hold-to-repeat on stepper buttons */
  @property({ type: Boolean, attribute: 'continuous' }) accessor continuous = false;

  /** delay in ms before continuous stepping starts */
  @property({ type: Number, attribute: 'continuous-delay' }) accessor continuousDelay = 500;

  /** interval in ms for continuous stepping */
  @property({ type: Number, attribute: 'continuous-interval' }) accessor continuousInterval = 100;

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static styles = [baseStyles, styles];

  #stepTimeout: number | null = null;
  #stepIntervalId: number | null = null;

  protected get input() {
    return this.shadowRoot.querySelector('input');
  }

  render() {
    const decrementDisabled = this.disabled || this.readOnly || this.valueAsNumber <= (this.min as number);
    const incrementDisabled = this.disabled || this.readOnly || this.valueAsNumber >= (this.max as number);

    return html`
      <div role="presentation" part="internal">
        <bp-button-icon
          part="decrement"
          shape="minus"
          aria-label=${this.i18n.decrement}
          action="inline"
          ?disabled=${decrementDisabled}
          @click=${this.#handleDecrement}
          @mousedown=${this.#handleDecrementStart}
          @mouseup=${this.#handleStepEnd}
          @mouseleave=${this.#handleStepEnd}
          @touchstart=${this.#handleDecrementStart}
          @touchend=${this.#handleStepEnd}></bp-button-icon>
        <input
          input
          type="number"
          placeholder=${this.placeholder}
          .ariaLabel=${this.composedLabel}
          .disabled=${this.disabled}
          .readOnly=${this.readOnly}
          ?required=${this.required}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          .value=${(this.value ?? '').toString()}
          role="spinbutton"
          aria-valuemin=${ifDefined(this.min)}
          aria-valuemax=${ifDefined(this.max)}
          aria-valuenow=${this.valueAsNumber}
          @change=${this.#onChange}
          @input=${this.#onInput} />
        <bp-button-icon
          part="increment"
          shape="add"
          aria-label=${this.i18n.increment}
          action="inline"
          ?disabled=${incrementDisabled}
          @click=${this.#handleIncrement}
          @mousedown=${this.#handleIncrementStart}
          @mouseup=${this.#handleStepEnd}
          @mouseleave=${this.#handleStepEnd}
          @touchstart=${this.#handleIncrementStart}
          @touchend=${this.#handleStepEnd}></bp-button-icon>
      </div>
    `;
  }

  constructor() {
    super();
    this.value = 0; // mixin defaults to ''
    this.step = 1; // mixin defaults to null
  }

  override focus() {
    this.input?.focus();
  }

  override blur() {
    this.input?.blur();
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'presentation';
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clearStepTimers();
  }

  /**
   * Increments the value by the step amount
   */
  stepUp(number = 1) {
    this.input?.stepUp(number);
    this.value = this.input.value;
  }

  /**
   * Decrements the value by the step amount
   */
  stepDown(number = 1) {
    this.input?.stepDown(number);
    this.value = this.input.value;
  }

  #handleIncrement(e: Event) {
    e.preventDefault();
    this.stepUp();
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #handleDecrement(e: Event) {
    e.preventDefault();
    this.stepDown();
    this.input.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #handleIncrementStart(e: Event) {
    if (!this.continuous || this.disabled) return;
    e.preventDefault();
    this.#startContinuousStepping('up');
  }

  #handleDecrementStart(e: Event) {
    if (!this.continuous || this.disabled) return;
    e.preventDefault();
    this.#startContinuousStepping('down');
  }

  #startContinuousStepping(direction: 'up' | 'down') {
    this.#clearStepTimers();
    this.#stepTimeout = window.setTimeout(() => {
      this.#stepIntervalId = window.setInterval(() => {
        const atBoundary =
          direction === 'up'
            ? this.max !== undefined && this.valueAsNumber >= (this.max as number)
            : this.min !== undefined && this.valueAsNumber <= (this.min as number);
        if (atBoundary) {
          this.#clearStepTimers();
        } else {
          direction === 'up' ? this.stepUp() : this.stepDown();
        }
      }, this.continuousInterval);
    }, this.continuousDelay);
  }

  #handleStepEnd(e: Event) {
    if (!this.continuous) return;
    e.preventDefault();
    this.#clearStepTimers();
  }

  #clearStepTimers() {
    if (this.#stepTimeout !== null) {
      clearTimeout(this.#stepTimeout);
      this.#stepTimeout = null;
    }
    if (this.#stepIntervalId !== null) {
      clearInterval(this.#stepIntervalId);
      this.#stepIntervalId = null;
    }
  }

  #onChange(e: InputEvent) {
    this._onChange(e, { valueType: 'number' });
  }

  #onInput(e: InputEvent) {
    this._onInput(e, { valueType: 'number' });
  }
}
