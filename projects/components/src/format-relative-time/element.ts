import { html, LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, interactionTextChange } from '@blueprintui/components/internals';
import styles from './element.css' with { type: 'css' };

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

  get #relativeTime() {
    try {
      const date = new Date(this._value);

      if (isNaN(date.getTime())) {
        console.warn('bp-format-relative-time: Invalid date value', this._value);
        return '';
      }

      const diffMs = date.getTime() - this._now;
      const diffSec = Math.round(diffMs / 1000);
      const diffMin = Math.round(diffMs / 60000);
      const diffHour = Math.round(diffMs / 3600000);
      const diffDay = Math.round(diffMs / 86400000);
      const diffWeek = Math.round(diffMs / 604800000);
      const diffMonth = Math.round(diffMs / 2629800000); // average month
      const diffYear = Math.round(diffMs / 31557600000); // average year

      let value: number;
      let selectedUnit: Intl.RelativeTimeFormatUnit;

      if (this.unit !== 'auto') {
        selectedUnit = this.unit;
        switch (this.unit) {
          case 'second':
            value = diffSec;
            break;
          case 'minute':
            value = diffMin;
            break;
          case 'hour':
            value = diffHour;
            break;
          case 'day':
            value = diffDay;
            break;
          case 'week':
            value = diffWeek;
            break;
          case 'month':
            value = diffMonth;
            break;
          case 'year':
            value = diffYear;
            break;
          default:
            value = diffSec;
            selectedUnit = 'second';
        }
      } else {
        // Auto-select the most appropriate unit
        if (Math.abs(diffYear) >= 1) {
          value = diffYear;
          selectedUnit = 'year';
        } else if (Math.abs(diffMonth) >= 1) {
          value = diffMonth;
          selectedUnit = 'month';
        } else if (Math.abs(diffWeek) >= 1) {
          value = diffWeek;
          selectedUnit = 'week';
        } else if (Math.abs(diffDay) >= 1) {
          value = diffDay;
          selectedUnit = 'day';
        } else if (Math.abs(diffHour) >= 1) {
          value = diffHour;
          selectedUnit = 'hour';
        } else if (Math.abs(diffMin) >= 1) {
          value = diffMin;
          selectedUnit = 'minute';
        } else {
          value = diffSec;
          selectedUnit = 'second';
        }
      }

      const formatter = new Intl.RelativeTimeFormat(this.locale, {
        numeric: this.numeric,
        style: this.formatStyle
      });

      return formatter.format(value, selectedUnit);
    } catch (error) {
      console.error('bp-format-relative-time: Error formatting relative time', error);
      return '';
    }
  }

  get #updateInterval() {
    if (this.unit !== 'auto') {
      switch (this.unit) {
        case 'second':
          return 1000; // 1 second
        case 'minute':
          return 60000; // 1 minute
        case 'hour':
          return 3600000; // 1 hour
        case 'day':
        case 'week':
        case 'month':
        case 'year':
          return 86400000; // 1 day
        default:
          return 60000;
      }
    }

    // Auto mode: determine interval based on time difference
    try {
      const date = new Date(this._value);
      if (isNaN(date.getTime())) return 60000;

      const diffMs = Math.abs(date.getTime() - this._now);
      const diffMin = diffMs / 60000;
      const diffHour = diffMs / 3600000;
      const diffDay = diffMs / 86400000;

      if (diffMin < 1) {
        return 1000; // Update every second for recent times
      } else if (diffHour < 1) {
        return 60000; // Update every minute for times within an hour
      } else if (diffDay < 1) {
        return 3600000; // Update every hour for times within a day
      } else {
        return 86400000; // Update every day for older times
      }
    } catch {
      return 60000; // Default to 1 minute
    }
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
