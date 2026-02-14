import { html, LitElement } from 'lit';
import { SelectFormControlMixin, OptionMixin, SelectOption } from '@blueprintui/components/forms';
import { baseStyles } from '@blueprintui/components/internals';
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
export class BpSelect extends SelectFormControlMixin(LitElement) {
  /** @override Return BpOption elements specifically */
  get options(): BpOption[] {
    return Array.from(this.querySelectorAll<BpOption>('bp-option'));
  }

  static get styles() {
    return [baseStyles, styles];
  }

  render() {
    return html`
      <div role="presentation" part="internal">
        <select
          input
          @change=${this._onChange}
          @input=${this._onInput}
          .ariaLabel=${this.composedLabel}
          .value=${this.value as string}
          .multiple=${this.multiple}
          .disabled=${this.disabled}
          .size=${this.size}>
          ${this.options.map(
            o =>
              html`<option value=${o.value} ?selected=${o.selected} .disabled=${o.disabled}>${o.textContent}</option>`
          )}
        </select>
        <slot hidden @slotchange=${this.updateInitialSelected}></slot>
        <bp-button-expand checked readonly></bp-button-expand>
      </div>
    `;
  }
}

/**
 * Option element for use within bp-select.
 *
 * @element bp-option
 * @since 1.0.0
 */
export class BpOption extends OptionMixin(LitElement) implements SelectOption {}
