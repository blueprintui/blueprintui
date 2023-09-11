import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  i18n,
  I18nService,
  I18nStrings,
  interactionClick,
  interactionStyles,
  stateActive
} from '@blueprintui/components/internals';
import { typeFormControl, TypeFormControl, TypeFormControlController } from '@blueprintui/components/forms';
import styles from './element.css' assert { type: 'css' };

export type ButtonSort = 'none' | 'ascending' | 'descending';

export interface BpButtonSort extends TypeFormControl {} // eslint-disable-line

/**
 * Button Sort
 * https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/
 *
 * ```typescript
 * import '@blueprintui/components/include/button-sort.js';
 * ```
 *
 * ```html
 * <bp-button-sort></bp-button-sort>
 * ```
 *
 * @element bp-button-sort
 * @since 1.0.0
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 * @cssprop --width
 * @cssprop --height
 * @cssprop --color
 * @cssprop --cursor
 * @cssprop --background
 * @cssprop --padding
 * @cssprop --outline
 * @cssprop --outline-offset
 * @cssprop --border
 * @cssprop --gap
 */
@stateActive<BpButtonSort>()
@typeFormControl<BpButtonSort>()
@interactionClick<BpButtonSort>()
@i18n<BpButtonSort>({ key: 'actions' })
export class BpButtonSort extends LitElement implements Pick<BpButtonSort, 'value' | 'readonly' | 'disabled' | 'i18n'> {
  @property({ type: String }) accessor value: ButtonSort = 'none';

  @property({ type: Boolean }) accessor readonly: boolean;

  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) accessor disabled: boolean;

  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static styles = [baseStyles, interactionStyles, styles];

  static formAssociated = true;

  private declare typeFormControlController: TypeFormControlController<this>;

  render() {
    return html`
      <div part="internal" interaction-after>
        <slot>
          <bp-icon shape="angle" direction="up"></bp-icon>
          <bp-icon shape="angle" direction="down"></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.tabIndex = 0;
    this._internals.role = 'spinbutton';
    this._internals.ariaLabel ??= this.i18n.sort;
    this.addEventListener('click', () => this.#updateValue(1));
    this.addEventListener('keydown', (e: KeyboardEvent) => this.#keydown(e));
  }

  updated(props: PropertyValues<this>) {
    super.updated(props);
    this.#updateStates();
  }

  #keydown(e: KeyboardEvent) {
    if (e.code === 'ArrowUp') {
      this.#updateValue(1);
    } else if (e.code === 'ArrowDown') {
      this.#updateValue(-1);
    }
  }

  #updateValue(step: number) {
    if (!this.readonly && !this.disabled) {
      const values = ['descending', 'none', 'ascending'];
      const next = values.indexOf(this.value) + step;
      const value = values[next < 0 ? values.length - 1 : next % values.length] as ButtonSort;

      // only update value statefully if name is set for form participation
      if (this.name) {
        this.value = value;
      }

      this.#updateStates();
      this.#input();
      this.#change();
    }
  }

  #updateStates() {
    this._internals.ariaValueText = this.i18n[this.value];
    this._internals.ariaValueNow = this.i18n[this.value];
    this._internals.states.delete('--none');
    this._internals.states.delete('--ascending');
    this._internals.states.delete('--descending');
    this._internals.states.add(`--${this.value}`);
  }

  #input() {
    this.typeFormControlController.dispatchInput(
      new InputEvent('input', { bubbles: true, composed: true, data: this.value })
    );
  }

  #change() {
    this.typeFormControlController.dispatchChange(new InputEvent('change', { bubbles: true, composed: true }));
  }
}
