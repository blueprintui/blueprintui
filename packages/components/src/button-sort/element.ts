import { html, LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators/property.js';
import { i18n, I18nService, I18nStrings, interactionClick, stateActive } from '@blueprintui/components/internals';
import { TypeFormControl, TypeFormControlController } from '@blueprintui/components/forms';
import { buttonIconStyles } from '@blueprintui/components/button-icon';
import styles from './element.css' assert { type: 'css' };

export type ButtonSort = 'none' | 'ascending' | 'descending';

export interface BpButtonSort extends TypeFormControl { } // eslint-disable-line

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
 * @event {InputEvent} input - occurs when the value changes
 * @event {InputEvent} change - occurs when the value changes
 */
@stateActive<BpButtonSort>()
@interactionClick<BpButtonSort>()
@i18n<BpButtonSort>({ key: 'actions' })
export class BpButtonSort extends LitElement {
  @property({ type: Object }) i18n: I18nStrings['actions'] = I18nService.keys.actions;
  
  @property({ type: String }) value: ButtonSort = 'none';

  @property({ type: Boolean }) readonly: boolean;

  @property({ type: Boolean }) disabled: boolean;

  static get styles() {
    return [buttonIconStyles, styles];
  }

  static formAssociated = true;

  protected typeFormControlController = new TypeFormControlController<BpButtonSort>(this);

  render() {
    return html`
      <div part="internal">
        <slot>
          <bp-icon shape="angle" direction="up" inner-offset="2" size="10"></bp-icon>
          <bp-icon shape="angle" direction="down" inner-offset="2" size="10"></bp-icon>
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
      this.value = values[next < 0 ? values.length - 1 : next % values.length] as ButtonSort;
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
    this.typeFormControlController.dispatchInput(new InputEvent('input', { bubbles: true, composed: true, data: this.value }));
  }

  #change() {
    this.typeFormControlController.dispatchChange(new InputEvent('change', { bubbles: true, composed: true }));
  }
}
