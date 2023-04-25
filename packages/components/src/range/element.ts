import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Range
 *
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
 * @element bp-range
 * @slot prefix - slot for prefix text or icons
 * @slot suffix - slot for suffic text or icons
 * @cssprop --accent-color
 * @cssprop --height
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRange extends FormControl {
  @property({ type: Number }) value = 50;

  @property({ type: Number }) step = 1;

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <input
          input
          type="range"
          .ariaLabel=${this.composedLabel}
          .value=${this.value}
          .min=${this.min ?? 0}
          .max=${this.max ?? 100}
          .step=${this.step ?? 1}
          .disabled=${this.disabled}
          @change=${(e: InputEvent) => this.onChange(e, { valueType: 'number' })}
          @input=${(e: InputEvent) => this.onInput(e, { valueType: 'number' })} />
      </div>
    `;
  }
}
