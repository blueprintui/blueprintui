import { html, LitElement } from 'lit';
import { SliderFormControlMixin } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
import type { BpIcon } from '@blueprintui/icons';
import styles from './element.css' with { type: 'css' };

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
 * @summary The rating input component is used to allow the user to select a rating value within a specified range of values.
 * @element bp-rating
 * @since 1.0.0
 * @cssprop --background
 * @cssprop --selected-background
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpRating extends SliderFormControlMixin(LitElement) {
  static styles = [baseStyles, styles];

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
          .valueAsNumber=${this.value as number}
          .disabled=${this.disabled}
          @keydown=${this.#stopPropagation}
          @pointerdown=${this.#stopPropagation}
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
                ?selected=${i <= (this.value as number) - 1}
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
    if (!this.hasAttribute('max')) {
      this.max = 5;
    }
    this.closest('bp-field')?.setAttribute('control-width', 'shrink');
  }

  #stopPropagation(e: Event) {
    e.stopPropagation();
  }

  #mouseenter(e: MouseEvent) {
    this.#updateIcons(parseInt((e.target as BpIcon).getAttribute('value')));
  }

  #mouseleave() {
    this.#updateIcons(this.value as number);
  }

  #click(e: MouseEvent) {
    this.#select(parseInt((e.target as BpIcon).getAttribute('value')) - 1);
  }

  #onChange(e: InputEvent) {
    this._onChange(e, { valueType: 'number' });
  }

  #onInput(e: InputEvent) {
    this._onInput(e, { valueType: 'number' });
  }

  #select(i: number) {
    if (!this.disabled && !this.readOnly) {
      this.#range.valueAsNumber = (this.value as number) === i + 1 ? 0 : i + 1;
      this.#range.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true }));
      this.#range.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }
  }

  #updateIcons(i: number) {
    this.#icons.forEach(icon => {
      icon.toggleAttribute('selected', parseInt(icon.getAttribute('value')) <= i);
    });
  }
}
