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
import { FormControlMixin } from '@blueprintui/components/forms';
import styles from './element.css' with { type: 'css' };

export type ButtonSort = 'none' | 'ascending' | 'descending';

/**
 * ```typescript
 * import '@blueprintui/components/include/button-sort.js';
 * ```
 *
 * ```html
 * <bp-button-sort></bp-button-sort>
 * ```
 *
 * @summary The sort button component is used to allow users to sort a list of items by a specific criteria. It is typically used in tables, lists, or other data focused components.
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
@interactionClick<BpButtonSort>()
@i18n<BpButtonSort>({ key: 'actions' })
export class BpButtonSort extends FormControlMixin<typeof LitElement, ButtonSort>(LitElement) {
  /** Defines the current sort direction state, cycling through none, ascending, and descending */
  get value(): ButtonSort {
    return (super.value as ButtonSort) || 'none';
  }

  set value(val: ButtonSort) {
    this.updateValue(val);
  }

  /** Sets the button as read-only, preventing sort state changes while maintaining focusability */
  get readonly(): boolean {
    return this.readOnly;
  }

  set readonly(value: boolean) {
    this.readOnly = value;
  }

  /** Provides internationalization strings for accessibility labels and screen reader announcements */
  @property({ type: Object }) accessor i18n: I18nStrings['actions'] = I18nService.keys.actions;

  static styles = [baseStyles, interactionStyles, styles];

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
    // Set default value if not provided via attribute
    if (!this.hasAttribute('value')) {
      this.value = 'none';
    }
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
      this.value = value;
      this.#updateStates();
      this.#input();
      this.#change();
    }
  }

  #updateStates() {
    this._internals.ariaValueText = this.i18n[this.value];
    this._internals.ariaValueNow = this.i18n[this.value];
    this._internals.states.delete('none');
    this._internals.states.delete('ascending');
    this._internals.states.delete('descending');
    this._internals.states.add(this.value);
  }

  #input() {
    this.checkValidity();
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true, data: this.value }));
  }

  #change() {
    this.checkValidity();
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }
}
