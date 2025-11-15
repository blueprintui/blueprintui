import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles, BpTypeControl } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/pin.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>Verification Code</label>
 *   <bp-pin length="6"></bp-pin>
 *   <bp-field-message>Enter the 6-digit code sent to your phone</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary PIN input component for entering verification codes and PINs with auto-advance and paste support
 * @element bp-pin
 * @since 2.9.0
 * @event {InputEvent} input - occurs when any field value changes
 * @event {InputEvent} change - occurs when the complete value changes
 * @event {CustomEvent<{value: string}>} complete - fires when all fields are filled
 * @cssprop --gap - space between input fields
 * @cssprop --width - width of each input field
 * @cssprop --height - height of each input field
 * @cssprop --font-size - font size for input text
 * @cssprop --border - border styling
 * @cssprop --border-radius - corner rounding
 * @cssprop --background - background color
 * @cssprop --color - text color
 */
export class BpPin extends FormControl implements Pick<BpTypeControl, keyof Omit<BpPin, 'length' | 'mask' | 'fields'>> {
  /** Number of input fields (typically 4-8) */
  @property({ type: Number }) accessor length = 4;

  /** Input type for each field */
  @property({ type: String }) accessor type: 'text' | 'number' = 'text';

  /** Complete pin value */
  @property({ type: String }) accessor value = '';

  /** Obscure input like password fields */
  @property({ type: Boolean }) accessor mask = false;

  /** Placeholder for empty fields */
  @property({ type: String }) accessor placeholder = '•';

  @state() private accessor fields: string[] = [];

  static styles = [baseStyles, styles];

  private get inputControls(): HTMLInputElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll('input') || []);
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'group';
    this.#initializeFields();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('length')) {
      this.#initializeFields();
    }

    if (changedProperties.has('value') && !this.#isInternalUpdate) {
      this.#updateFieldsFromValue();
    }
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        ${repeat(
          this.fields,
          (_, i) => i,
          (field, i) => html`
            <input
              data-index=${i}
              type=${this.mask ? 'password' : this.type}
              inputmode="numeric"
              maxlength="1"
              autocomplete=${i === 0 ? this.autocomplete || 'one-time-code' : 'off'}
              placeholder=${this.placeholder}
              .ariaLabel=${this.composedLabel ? `${this.composedLabel} digit ${i + 1}` : `Digit ${i + 1}`}
              ?required=${this.required && i === 0}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              pattern=${ifDefined(this.pattern)}
              .value=${field}
              @input=${this.#onInput}
              @keydown=${this.#onKeyDown}
              @paste=${this.#onPaste}
              @focus=${this.#onFocus} />
          `
        )}
      </div>
    `;
  }

  focus() {
    const firstEmptyInput = this.inputControls.find(input => !input.value) || this.inputControls[0];
    firstEmptyInput?.focus();
  }

  reset() {
    this.#isInternalUpdate = true;
    this.fields = Array(this.length).fill('');
    this.value = '';
    this.#isInternalUpdate = false;
    super.reset();
  }

  #isInternalUpdate = false;

  #initializeFields() {
    this.#isInternalUpdate = true;
    this.fields = Array(this.length).fill('');
    this.#updateFieldsFromValue();
    this.#isInternalUpdate = false;
  }

  #updateFieldsFromValue() {
    if (this.value) {
      const chars = this.value.split('').slice(0, this.length);
      this.fields = [...chars, ...Array(Math.max(0, this.length - chars.length)).fill('')];
    } else {
      this.fields = Array(this.length).fill('');
    }
  }

  #onInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const index = parseInt(target.dataset.index);
    let inputValue = target.value;

    // Handle input validation based on pattern
    if (this.pattern && inputValue) {
      const regex = new RegExp(this.pattern);
      if (!regex.test(inputValue)) {
        target.value = this.fields[index];
        return;
      }
    }

    // Handle numeric type validation
    if (this.type === 'number' && inputValue && !/^\d$/.test(inputValue)) {
      target.value = this.fields[index];
      return;
    }

    // Update field value (take only first character if multiple were entered)
    if (inputValue.length > 1) {
      inputValue = inputValue.charAt(0);
      target.value = inputValue;
    }

    this.#isInternalUpdate = true;
    this.fields = [...this.fields];
    this.fields[index] = inputValue;
    this.#updateValue();
    this.#isInternalUpdate = false;

    this.onInput(e);

    // Auto-advance to next field if value was entered
    if (inputValue && index < this.length - 1) {
      this.inputControls[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (this.#isComplete()) {
      this.dispatchEvent(
        new CustomEvent('complete', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  #onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const index = parseInt(target.dataset.index);

    // Handle backspace - move to previous field if current is empty
    if (e.key === 'Backspace' && !target.value && index > 0) {
      e.preventDefault();
      this.inputControls[index - 1]?.focus();
    }

    // Handle delete - clear current and stay
    if (e.key === 'Delete') {
      this.#isInternalUpdate = true;
      this.fields = [...this.fields];
      this.fields[index] = '';
      this.#updateValue();
      this.#isInternalUpdate = false;
      target.value = '';
    }

    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.inputControls[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this.inputControls[index + 1]?.focus();
    }

    // Handle Home/End keys
    if (e.key === 'Home') {
      e.preventDefault();
      this.inputControls[0]?.focus();
    }

    if (e.key === 'End') {
      e.preventDefault();
      this.inputControls[this.length - 1]?.focus();
    }
  }

  async #onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';
    const target = e.target as HTMLInputElement;
    const startIndex = parseInt(target.dataset.index);

    // Clean and validate pasted data
    let cleanedData = pastedData.replace(/\s/g, '').slice(0, this.length);

    // Validate against pattern if specified
    if (this.pattern) {
      const regex = new RegExp(`^${this.pattern}+$`);
      if (!regex.test(cleanedData)) {
        return;
      }
    }

    // Validate for numeric type
    if (this.type === 'number') {
      cleanedData = cleanedData.replace(/\D/g, '');
    }

    if (!cleanedData) return;

    // Distribute characters across fields starting from current position
    this.#isInternalUpdate = true;
    this.fields = [...this.fields];
    const chars = cleanedData.split('');

    chars.forEach((char, i) => {
      const fieldIndex = startIndex + i;
      if (fieldIndex < this.length) {
        this.fields[fieldIndex] = char;
      }
    });

    this.#updateValue();
    this.#isInternalUpdate = false;

    // Update the input elements
    this.requestUpdate();
    await this.updateComplete;

    // Focus the next empty field or the last filled field
    const nextEmptyIndex = this.fields.findIndex((f, i) => i >= startIndex && !f);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(startIndex + chars.length, this.length - 1);
    this.inputControls[focusIndex]?.focus();

    // Trigger input event
    const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
    this.onInput(inputEvent);

    // Check if complete
    if (this.#isComplete()) {
      this.dispatchEvent(
        new CustomEvent('complete', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  #onFocus(e: FocusEvent) {
    const target = e.target as HTMLInputElement;
    // Select the content when focused for easy replacement
    target.select();
  }

  #updateValue() {
    this.value = this.fields.join('');
  }

  #isComplete(): boolean {
    return this.fields.every(field => field !== '');
  }
}
