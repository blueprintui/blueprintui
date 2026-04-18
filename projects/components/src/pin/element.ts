import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { repeat } from 'lit/directives/repeat.js';
import { FormControlMixin } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
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
export class BpPin extends FormControlMixin(LitElement) {
  /** Number of input fields (typically 4-8) */
  @property({ type: Number }) accessor length = 4;

  /** Input type for each field */
  @property({ type: String }) accessor type: 'text' | 'number' = 'text';

  /** Obscure input like password fields */
  @property({ type: Boolean }) accessor mask = false;

  @state() private accessor fields: string[] = [];

  static styles = [baseStyles, styles];

  /** Complete pin value */
  override get value(): string {
    return super.value as string;
  }

  override set value(val: string) {
    super.value = val;
    if (!this.#isInternalUpdate) {
      this.#updateFieldsFromValue();
    }
  }

  private get inputControls(): HTMLInputElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll('input') || []);
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'group';
    if (!this.hasAttribute('placeholder')) {
      this.placeholder = '•';
    }
    this.#initializeFields();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    if (changedProperties.has('length')) {
      this.#initializeFields();
    }
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        ${repeat(
          this.fields,
          (_, i) => i,
          (_field, i) => html`
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
              ?readonly=${this.readOnly}
              pattern=${ifDefined(this.pattern)}
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
    super.reset();
    this.#isInternalUpdate = true;
    this.fields = Array(this.length).fill('');
    this.value = '';
    this.inputControls.forEach(input => (input.value = ''));
    this.#isInternalUpdate = false;
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
    // Only update DOM if this is an external value change (not internal typing)
    if (!this.#isInternalUpdate && this.inputControls.length > 0) {
      this.inputControls.forEach((input, i) => {
        if (input.value !== this.fields[i]) {
          input.value = this.fields[i] || '';
        }
      });
    }
  }

  #onInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const index = parseInt(target.dataset.index);

    if (!this.#isValidInput(target)) {
      target.value = this.fields[index];
      return;
    }

    const inputValue = this.#truncateInput(target);

    this.#commitField(index, inputValue);
    this._onInput(e);

    // Auto-advance to next field if value was entered
    if (inputValue && index < this.length - 1) {
      this.inputControls[index + 1]?.focus();
    }

    this.#complete();
  }

  #isValidInput(target: HTMLInputElement): boolean {
    const value = target.value;
    if (!value) return true;
    if (this.pattern && !new RegExp(this.pattern).test(value)) return false;
    if (this.type === 'number' && !/^\d$/.test(value)) return false;
    return true;
  }

  #truncateInput(target: HTMLInputElement): string {
    if (target.value.length > 1) {
      target.value = target.value.charAt(0);
    }
    return target.value;
  }

  #commitField(index: number, value: string) {
    this.#isInternalUpdate = true;
    this.fields = [...this.fields];
    this.fields[index] = value;
    this.#updateValue();

    this.updateComplete.then(() => {
      const expectedValue = this.fields.join('');
      if (this.value !== expectedValue) {
        this.value = expectedValue;
      }
      this.#isInternalUpdate = false;
    });
  }

  #onKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;
    const index = parseInt(target.dataset.index);

    if (e.key === 'Backspace' && !target.value && index > 0) {
      e.preventDefault();
      this.inputControls[index - 1]?.focus();
      return;
    }

    if (e.key === 'Delete') {
      e.preventDefault();
      this.#deleteFieldAt(index, target);
      return;
    }

    this.#handleNavigationKey(e, index);
  }

  #deleteFieldAt(index: number, target: HTMLInputElement) {
    this.#isInternalUpdate = true;
    this.fields = [...this.fields];
    this.fields[index] = '';
    this.#updateValue();
    this.#isInternalUpdate = false;
    target.value = '';

    const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
    this._onInput(inputEvent);
  }

  #handleNavigationKey(e: KeyboardEvent, index: number) {
    const focusTargets: Record<string, number | (() => number)> = {
      ArrowLeft: index - 1,
      ArrowRight: index + 1,
      Home: 0,
      End: this.length - 1
    };

    if (!(e.key in focusTargets)) return;
    const targetIndex = focusTargets[e.key] as number;
    if (targetIndex < 0 || targetIndex >= this.length) return;

    e.preventDefault();
    this.inputControls[targetIndex]?.focus();
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

    // Update the DOM input values
    this.inputControls.forEach((input, i) => {
      input.value = this.fields[i] || '';
    });

    // Focus the next empty field or the last filled field
    const nextEmptyIndex = this.fields.findIndex((f, i) => i >= startIndex && !f);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : Math.min(startIndex + chars.length, this.length - 1);
    this.inputControls[focusIndex]?.focus();

    // Trigger input event
    const inputEvent = new InputEvent('input', { bubbles: true, composed: true });
    this._onInput(inputEvent);

    this.#complete();
  }

  #complete() {
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
