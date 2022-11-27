import { html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { BpButtonIcon } from '@blueprintui/components/button-icon';
import styles from './element.css' assert { type: 'css' };

export type ButtonSort = 'none' | 'ascending' | 'descending';

/**
 * Action Button
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
 * @event sort
 */
export class BpButtonSort extends BpButtonIcon {
  @property({ type: String, reflect: true }) sort: ButtonSort = 'none';

  static get styles() {
    return [...super.styles, styles];
  }

  render() {
    return html`
      <div class="private-host">
        <slot>
          <bp-icon shape="angle" direction="up" inner-offset="2" size="10"></bp-icon>
          <bp-icon shape="angle" direction="down" inner-offset="2" size="10"></bp-icon>
        </slot>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', () => this.dispatchEvent(new CustomEvent('sort', { detail: this.sort, bubbles: true })));

    if (!this._internals.ariaLabel) {
      this._internals.ariaLabel = this.i18n.sort;
    }
  }
}
