import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles } from '@blueprintui/components/internals';
import { FormControl } from '@blueprintui/components/forms';
import type { BpIcon } from '@blueprintui/icons';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/rating.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>rating</label>
 *   <bp-rating min="0" max="5" value="3" step="1"></bp-rating>
 * </bp-field>
 * ```
 *
 * @element bp-rating
 * @cssprop --background
 * @cssprop --selected-background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRating extends FormControl {
  static formAssociated = true;

  static styles = [baseStyles, styles];

  /** determines initial value of the control */
  @property({ type: Number }) value = 0;

  /** defines the most negative value in the range of permitted values */
  @property({ type: Number }) min = 0;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) max = 5;

  get #range() {
    return this.shadowRoot.querySelector('input');
  }

  get #icons() {
    return Array.from(this.shadowRoot.querySelectorAll<BpIcon>('bp-icon'));
  }

  render() {
    return html`
      <div part="internal" focusable>
        <input
          input
          role="none"
          type="range"
          min=${this.min}
          max=${this.max}
          .ariaLabel=${this.composedLabel}
          .valueAsNumber=${this.value}
          .disabled=${this.disabled}
          @change=${this.#onChange}
          @input=${this.#onInput} />

        ${Array(this.max)
          .fill(0)
          .map(
            (_, i) =>
              html` <bp-icon
                @mouseenter=${this.#mouseenter}
                @mouseleave=${this.#mouseleave}
                @click=${this.#click}
                value=${i + 1}
                ?selected=${i <= this.value - 1}
                shape="favorite"
                size="sm"
                type="solid">
              </bp-icon>`
          )}
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._internals.role = 'slider';
    this.closest('bp-field')?.setAttribute('control-width', 'shrink');
  }

  #mouseenter(e: MouseEvent) {
    this.#updateIcons(parseInt((e.target as BpIcon).getAttribute('value')));
  }

  #mouseleave() {
    this.#updateIcons(this.value);
  }

  #click(e: MouseEvent) {
    this.#select(parseInt((e.target as BpIcon).getAttribute('value')) - 1);
  }

  #onChange(e: InputEvent) {
    this.onChange(e, { valueType: 'number' });
  }

  #onInput(e: InputEvent) {
    this.onInput(e, { valueType: 'number' });
  }

  #select(i: number) {
    this.#range.valueAsNumber = this.value === i + 1 ? 0 : i + 1;
    this.#range.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true }));
    this.#range.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  }

  #updateIcons(i: number) {
    this.#icons.forEach(icon => {
      icon.toggleAttribute('selected', parseInt(icon.getAttribute('value')) <= i);
    });
  }
}
