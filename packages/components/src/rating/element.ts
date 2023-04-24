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

  @property({ type: String, reflect: true }) value = '0';

  @property({ type: String }) min = 0;

  @property({ type: String }) max = 5;

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
          .ariaLabel=${this.composedLabel}
          .value=${this.value}
          .min=${this.min}
          .max=${this.max}
          @change=${(e: Event) => this.onChange(e)}
          @input=${(e: Event) => this.onInput(e)}
          .disabled=${this.disabled} />

        ${Array(this.max)
          .fill(0)
          .map(
            (_, i) => html` <bp-icon
              @mouseenter=${() => this.#updateIcons(i + 1)}
              @mouseleave=${() => this.#updateIcons(parseInt(this.value))}
              @click=${() => this.#select(i)}
              .value=${i + 1}
              ?selected=${i <= parseInt(this.value) - 1}
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

  #select(i: number) {
    this.#range.value = this.value === `${i + 1}` ? '0' : `${i + 1}`;
    this.#range.dispatchEvent(new InputEvent('change', { bubbles: true, composed: true }));
    this.#range.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  }

  #updateIcons(i: number) {
    this.#icons.forEach((icon: any) => {
      icon.toggleAttribute('selected', icon.value <= i);
    });
  }
}
