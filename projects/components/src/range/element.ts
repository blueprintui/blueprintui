import { html, LitElement } from 'lit';
import { SliderFormControlMixin } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/range.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>range</label>
 *   <bp-range></bp-range>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary The range input component is used to allow the user to select a value within a specified range of values.
 * @element bp-range
 * @since 1.0.0
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffix text or icons
 * @slot - slot for range input
 * @cssprop --accent-color
 * @cssprop --height
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRange extends SliderFormControlMixin(LitElement) {
  static get styles() {
    return [baseStyles, styles];
  }

  connectedCallback() {
    super.connectedCallback();
    this.value = this.hasAttribute('value') ? parseFloat(this.getAttribute('value')) : 50;
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <input
          input
          type="range"
          min=${this.min}
          max=${this.max}
          step=${this.step}
          .ariaLabel=${this.composedLabel}
          .disabled=${this.disabled}
          .valueAsNumber=${this.value as number}
          @keydown=${this.#stopPropagation}
          @pointerdown=${this.#stopPropagation}
          @change=${this.#onChange}
          @input=${this.#onInput} />
      </div>
    `;
  }

  #stopPropagation(e: Event) {
    e.stopPropagation();
  }

  #onChange(e: InputEvent) {
    this._onChange(e, { valueType: 'number' });
  }

  #onInput(e: InputEvent) {
    this._onInput(e, { valueType: 'number' });
  }
}
