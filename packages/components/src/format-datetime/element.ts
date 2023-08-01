import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { attachInternals, baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * ```typescript
 * import '@blueprintui/components/include/format-datetime.js';
 * ```
 *
 * ```html
 * <bp-format-datetime></bp-format-datetime>
 * ```
 *
 * @element bp-format-datetime
 */
@interactionTextChange()
export class BpFormatDatetime extends LitElement {
  @property({ type: String }) locale: string;

  @property({ type: String }) weekday: 'long' | 'short' | 'narrow';

  @property({ type: String }) year: 'numeric' | '2-digit';

  @property({ type: String }) month: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

  @property({ type: String }) day: 'numeric' | '2-digit';

  @property({ type: String }) hour: 'numeric' | '2-digit';

  @property({ type: String }) minute: 'numeric' | '2-digit';

  @property({ type: String }) second: 'numeric' | '2-digit';

  @property({ type: String, attribute: 'date-style' }) dateStyle: 'full' | 'long' | 'medium' | 'short';

  @property({ type: String, attribute: 'time-style' }) timeStyle: 'full' | 'long' | 'medium' | 'short';

  @property({ type: String, attribute: 'time-zone-name' }) timeZoneName: 'long' | 'short';

  @property({ type: String, attribute: 'time-zone' }) timeZone: string;

  @state() private value = new Date().toDateString();

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
    }).format(new Date(this.value));
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
    this.value = new Date().toDateString();
    this.addEventListener('bp-textchange', () => (this.value = this.textContent));
  }
}
