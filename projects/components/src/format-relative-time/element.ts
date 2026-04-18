import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

const UNIT_MS: Record<Intl.RelativeTimeFormatUnit, number> = {
  second: 1000,
  seconds: 1000,
  minute: 60000,
  minutes: 60000,
  hour: 3600000,
  hours: 3600000,
  day: 86400000,
  days: 86400000,
  week: 604800000,
  weeks: 604800000,
  month: 2629800000,
  months: 2629800000,
  quarter: 7889400000,
  quarters: 7889400000,
  year: 31557600000,
  years: 31557600000
};

const AUTO_UNITS: Intl.RelativeTimeFormatUnit[] = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];

const SYNC_INTERVALS: Partial<Record<Intl.RelativeTimeFormatUnit, number>> = {
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 86400000,
  week: 86400000,
  month: 86400000,
  year: 86400000
};

/**
 * ```typescript
 * import '@blueprintui/components/include/format-relative-time.js';
 * ```
 *
 * ```html
 * <bp-format-relative-time>2024-11-16T10:30:00Z</bp-format-relative-time>
 * ```
 *
 * @summary The format-relative-time component displays relative time (e.g., "2 hours ago", "in 3 days") using the Intl.RelativeTimeFormat API.
 * @element bp-format-relative-time
 * @since 2.10.0
 */
@interactionTextChange()
export class BpFormatRelativeTime extends LitElement {
  /** determines how to format the time: 'auto' shows "yesterday" vs "1 day ago" */
  @property({ type: String }) accessor numeric: 'always' | 'auto' = 'auto';

  /** determines the formatting style: 'long', 'short', or 'narrow' */
  @property({ type: String, attribute: 'format-style' }) accessor formatStyle: 'long' | 'short' | 'narrow' = 'long';

  /** the time unit to use, or 'auto' to automatically select the best unit */
  @property({ type: String }) accessor unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' | 'auto' =
    'auto';

  /** auto-update the displayed time at appropriate intervals */
  @property({ type: Boolean }) accessor sync = false;

  /** locale to use for formatting */
  @property({ type: String }) accessor locale: string;

  @state() private accessor _value: string = '';

  @state() private accessor _now = Date.now();

  #syncInterval: number | null = null;

  static styles = [baseStyles, styles];

  #selectUnit(diffMs: number): { value: number; unit: Intl.RelativeTimeFormatUnit } {
    if (this.unit !== 'auto') {
      const ms = UNIT_MS[this.unit] ?? 1000;
      return { value: Math.round(diffMs / ms), unit: this.unit };
    }

    for (const unit of AUTO_UNITS) {
      const value = Math.round(diffMs / UNIT_MS[unit]);
      if (Math.abs(value) >= 1) {
        return { value, unit };
      }
    }

    return { value: Math.round(diffMs / 1000), unit: 'second' };
  }

  get #relativeTime() {
    try {
      const date = new Date(this._value);

      if (isNaN(date.getTime())) {
        console.warn('bp-format-relative-time: Invalid date value', this._value);
        return '';
      }

      const { value, unit } = this.#selectUnit(date.getTime() - this._now);
      const formatter = new Intl.RelativeTimeFormat(this.locale, {
        numeric: this.numeric,
        style: this.formatStyle
      });

      return formatter.format(value, unit);
    } catch (error) {
      console.error('bp-format-relative-time: Error formatting relative time', error);
      return '';
    }
  }

  #autoInterval() {
    try {
      const date = new Date(this._value);
      if (isNaN(date.getTime())) return 60000;

      const diffMs = Math.abs(date.getTime() - this._now);
      if (diffMs / 60000 < 1) return 1000;
      if (diffMs / 3600000 < 1) return 60000;
      if (diffMs / 86400000 < 1) return 3600000;
      return 86400000;
    } catch {
      return 60000;
    }
  }

  get #updateInterval() {
    if (this.unit === 'auto') {
      return this.#autoInterval();
    }
    return SYNC_INTERVALS[this.unit] ?? 60000;
  }

  render() {
    return html`<time part="internal" datetime=${this._value}>${this.#relativeTime}</time>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._value = this.textContent?.trim() || '';
    this._now = Date.now();
    this.addEventListener('bp-textchange', () => {
      this._value = this.textContent?.trim() || '';
      this._now = Date.now();
    });
    this.#setupSync();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#clearSync();
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('sync') || changedProperties.has('unit')) {
      this.#setupSync();
    }
  }

  #setupSync() {
    this.#clearSync();
    if (this.sync) {
      this.#syncInterval = window.setInterval(() => {
        this._now = Date.now();
      }, this.#updateInterval);
    }
  }

  #clearSync() {
    if (this.#syncInterval !== null) {
      clearInterval(this.#syncInterval);
      this.#syncInterval = null;
    }
  }
}
