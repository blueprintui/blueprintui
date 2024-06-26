import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles, BpTypeControl } from '@blueprintui/components/internals';
import { inputStyles } from '@blueprintui/components/input';
import styles from './element.css' with { type: 'css' };

/**
 * Select
 *
 * ```typescript
 * import '@blueprintui/components/include/select.js';
 * ```
 *
 * ```html
 * <bp-field>
 *   <label>select</label>
 *   <bp-select>
 *     <bp-option>option one</bp-option>
 *     <bp-option>option two</bp-option>
 *     <bp-option>option three</bp-option>
 *   </bp-select>
 * </bp-field>
 * ```
 *
 * @element bp-select
 * @since 1.0.0
 * @slot - For projecting select and label
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
export class BpSelect extends FormControl implements Pick<BpTypeControl, keyof BpSelect> {
  get #options() {
    return Array.from(this.querySelectorAll<HTMLOptionElement>('bp-option'));
  }

  get #input() {
    return this.shadowRoot.querySelector('select');
  }

  static get styles() {
    return [baseStyles, inputStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <select
          input
          .ariaLabel=${this.composedLabel}
          .value=${this.value as string}
          @change=${this.onChange}
          @input=${this.onInput}
          .multiple=${this.multiple}
          .disabled=${this.disabled}>
          ${this.#options.map(o => html`<option value=${o.value} ?selected=${o.selected}>${o.textContent}</option>`)}
        </select>
        <slot hidden @slotchange=${this.#updateInitialSelected}></slot>
        <bp-button-expand checked readonly></bp-button-expand>
      </div>
    `;
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    if (props.has('value') && this.value) {
      this.#input.value = this.value as string;
    }
  }

  #updateInitialSelected() {
    if (!this.value) {
      this.value = this.#input.value;
    }
  }
}

export class BpOption extends LitElement {
  @property({ type: String }) accessor value: string;
  @property({ type: Boolean }) accessor selected: boolean;
}
