import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { BpInput, inputStyles } from '@blueprintui/components/input';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/number.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>quantity</label>
 *   <bp-number value="10" min="0" max="100"></bp-number>
 *   <bp-field-message>message text</bp-field-message>
 * </bp-field>
 * ```
 *
 * @summary The number input component is used to allow users to input numeric values with optional min, max, and step constraints.
 * @element bp-number
 * @since 2.11.0
 * @slot prefix - slot for prefix text or icons (e.g., currency symbols)
 * @slot suffix - slot for suffix text or icons (e.g., units)
 * @cssprop --background
 * @cssprop --color
 * @cssprop --border
 * @cssprop --border-radius
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --padding
 * @cssprop --font-size
 * @cssprop --line-height
 * @cssprop --height
 * @cssprop --min-width
 * @cssprop --width
 * @cssprop --transition
 * @cssprop --text-align
 * @cssprop --cursor
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpNumber extends BpInput {
  /** Specifies the input type as number for numeric input behavior */
  @property({ type: String }) accessor type = 'number';

  static styles = [baseStyles, inputStyles, styles];

  render() {
    return html`
      <div role="presentation" part="internal">
        ${this.prefixTemplate}
        <slot name="prefix"></slot>
        <input
          input
          type="number"
          placeholder=${this.placeholder}
          size=${ifDefined(this.size)}
          .autocomplete=${ifDefined(this.autocomplete) as string}
          ?required=${this.required}
          ?readonly=${this.readOnly}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          step=${ifDefined(this.step)}
          .ariaLabel=${this.composedLabel}
          .value=${this.value as string}
          .disabled=${this.disabled || this.readOnly}
          @change=${this.#onChange}
          @input=${this.#onInput} />
        <slot name="suffix"></slot>
        ${this.suffixTemplate}
      </div>
    `;
  }

  /**
   * Increments the value by the step amount
   */
  stepUp(number?: number) {
    this.input?.stepUp(number);
    this.value = this.input.value;
  }

  /**
   * Decrements the value by the step amount
   */
  stepDown(number?: number) {
    this.input?.stepDown(number);
    this.value = this.input.value;
  }

  #onChange(e: InputEvent) {
    this._onChange(e, { valueType: 'number' });
  }

  #onInput(e: InputEvent) {
    this._onInput(e, { valueType: 'number' });
  }
}
