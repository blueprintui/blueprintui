import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { baseStyles, I18nService, i18n } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

/**
 * Grid Placeholder
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid-placeholder
 */
@i18n<BpGridPlaceholder>({ key: 'actions' })
export class BpGridPlaceholder extends LitElement {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @state() _colSpan = '0';

  static styles = [baseStyles, styles];

  #internals = this.attachInternals();

  render() {
    return html`
      <slot role="gridcell" part="internal" .ariaColSpan=${this._colSpan}>
        ${this.getAttribute('draggable') !== 'false'
          ? html`<p>${this.i18n.noData}</p>`
          : html`<p sr-only>${this.i18n.dropTarget}</p>`}
      </slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#internals.role = 'row';
  }
}
