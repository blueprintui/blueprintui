import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, I18nService, i18n } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

function numDigits(x: number) {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}

/**
 * Grid Pagination
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * ```html
 * <bp-grid-pagination></bp-grid-pagination>
 * ```
 *
 * @element bp-grid-pagination
 * @event page
 * @event size
 */
@i18n<BpGridPagination>({ key: 'actions' })
export class BpGridPagination extends LitElement {
  @property({ type: Object }) i18n = I18nService.keys.actions;

  @property({ type: Number }) page = 1;

  @property({ type: Number, attribute: 'page-size' }) pageSize = 10;

  @property({ type: Number, attribute: 'page-count' }) pageCount = 1;

  @property({ type: Array, attribute: 'page-size-options' }) pageSizeOptions: number[] = [];

  static styles = [baseStyles, styles];

  render() {
    return html`
      <section part="internal">
        <bp-pagination aria-label="pagination">
          ${this.pageSizeOptions.length ? html`
          <bp-select
            slot="page-size"
            .value=${this.pageSize.toString()}
            .ariaLabel=${this.i18n.pageSize}
            @input=${(e: any) => this.#sizeChange(parseInt(e.target.value))}>
            ${this.pageSizeOptions.map(i => html`<bp-option value=${i} ?selected=${i === this.pageSize}>${i}</bp-option>`)}
          </bp-select>` : ''}
          <bp-button-icon slot="first" .ariaLabel=${this.i18n.firstPage} .disabled=${this.page === 1} @click=${this.#firstPage}></bp-button-icon>
          <bp-button-icon slot="prev" .ariaLabel=${this.i18n.previousPage} .disabled=${this.page === 1} @click=${this.#prevPage}></bp-button-icon>
          <bp-field novalidate>
            <bp-input type="number" size=${numDigits(this.page)} min="1" value=${this.page} max=${this.pageCount} .ariaLabel=${`${this.page} of ${this.pageCount}`} @input=${this.#setPage}></bp-input>
            <bp-field-message>/ ${this.pageCount}</bp-field-message>
          </bp-field>
          <bp-button-icon slot="next" .ariaLabel=${this.i18n.nextPage} ?disabled=${this.page === this.pageCount} @click=${this.#nextPage}></bp-button-icon>
          <bp-button-icon slot="last" .ariaLabel=${this.i18n.lastPage} ?disabled=${this.page === this.pageCount} @click=${this.#lastPage}></bp-button-icon>
        </bp-pagination>
      </section>
    `;
  }

  #setPage(event: any) {
    this.#pageChange((event.target as HTMLInputElement).valueAsNumber);
  }

  #nextPage() {
    this.#pageChange(this.page + 1);
  }

  #prevPage() {
    this.#pageChange(this.page - 1);
  }

  #firstPage() {
    this.#pageChange(1);
  }

  #lastPage() {
    this.#pageChange(this.pageCount);
  }

  #pageChange(detail: number) {
    this.dispatchEvent(new CustomEvent('page', { detail }));
  }

  #sizeChange(detail: number) {
    this.dispatchEvent(new CustomEvent('size', { detail }));
  }
}
