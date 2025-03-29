import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { FormControl } from '@blueprintui/components/forms';
import { baseStyles, BpTypeControl } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
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
 * @summary The select input component allows users to select an option from a dropdown list of options. The options are displayed when the user clicks on the select input.
 * @element bp-select
 * @since 1.0.0
 * @slot - For projecting select and label
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
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
 * @cssprop --cursor
 * @cssprop --width
 */
export class BpSelect extends FormControl implements Pick<BpTypeControl, keyof BpSelect> {
  get #options() {
    return Array.from(this.querySelectorAll<HTMLOptionElement>('bp-option'));
  }

  get #input() {
    return this.shadowRoot.querySelector('select');
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <select
          input
          @change=${this.onChange}
          @input=${this.onInput}
          .ariaLabel=${this.composedLabel}
          .value=${this.value as string}
          .multiple=${this.multiple}
          .disabled=${this.disabled}
          .size=${this.size}>
          ${this.#options.map(
            o =>
              html`<option value=${o.value} ?selected=${o.selected} .disabled=${o.disabled}>${o.textContent}</option>`
          )}
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
