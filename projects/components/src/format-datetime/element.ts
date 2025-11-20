import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { attachInternals, baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-datetime.js';
 * ```
 *
 * ```html
 * <bp-format-datetime></bp-format-datetime>
 * ```
 *
 * @summary The format-datetime component is used to display a date and time in a human-readable format. The element API reflects the [Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) API.
 * @element bp-format-datetime
 * @since 1.17.0
 */
@interactionTextChange()
export class BpFormatDatetime extends LitElement {
  /** Specifies the locale for date and time formatting */
  @property({ type: String }) accessor locale: string;

  /** Controls the weekday representation in the formatted date */
  @property({ type: String }) accessor weekday: 'long' | 'short' | 'narrow';

  /** Controls the year representation in the formatted date */
  @property({ type: String }) accessor year: 'numeric' | '2-digit';

  /** Controls the month representation in the formatted date */
  @property({ type: String }) accessor month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

  /** Controls the day representation in the formatted date */
  @property({ type: String }) accessor day: 'numeric' | '2-digit';

  /** Controls the hour representation in the formatted time */
  @property({ type: String }) accessor hour: 'numeric' | '2-digit';

  /** Controls the minute representation in the formatted time */
  @property({ type: String }) accessor minute: 'numeric' | '2-digit';

  /** Controls the second representation in the formatted time */
  @property({ type: String }) accessor second: 'numeric' | '2-digit';

  /** Defines a preset formatting style for the date portion */
  @property({ type: String, attribute: 'date-style' }) accessor dateStyle: 'full' | 'long' | 'medium' | 'short';

  /** Defines a preset formatting style for the time portion */
  @property({ type: String, attribute: 'time-style' }) accessor timeStyle: 'full' | 'long' | 'medium' | 'short';

  /** Controls how the time zone name is displayed in the formatted datetime */
  @property({ type: String, attribute: 'time-zone-name' }) accessor timeZoneName: 'long' | 'short';

  /** Specifies the time zone to use for formatting */
  @property({ type: String, attribute: 'time-zone' }) accessor timeZone: string;

  @state() private accessor _value = new Date().toDateString();

  get #value() {
    return new Intl.DateTimeFormat(this.locale, {
      weekday: this.weekday,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      dateStyle: this.dateStyle,
      timeStyle: this.timeStyle,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone
    }).format(new Date(this._value));
  }

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`<div part="internal">${this.#value}</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    attachInternals(this);
    this._internals.role = 'time';
    this._value = new Date().toDateString();
    this.addEventListener('bp-textchange', () => (this._value = this.textContent));
  }
}
