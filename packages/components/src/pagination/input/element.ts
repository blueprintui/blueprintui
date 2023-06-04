import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { typeFormControl, TypeFormControl } from '@blueprintui/components/forms';
import { baseStyles, I18nService, i18n } from '@blueprintui/components/internals';
import styles from './element.css' assert { type: 'css' };

function numDigits(x: number) {
  return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
}

export interface BpPaginationInput extends TypeFormControl {} // eslint-disable-line

/**
 * Grid Pagination
 *
 * ```typescript
 * import '@blueprintui/components/include/pagination.js';
 * ```
 *
 * ```html
 * <form>
 *   <bp-pagination-input name="pagination" value="1" max="500" size="10" size-options="[10, 50, 100]"></bp-pagination-input>
 * </form>
 * ```
 *
 * @element bp-pagination-input
 * @event input
 * @event change
 */
@typeFormControl<BpPaginationInput>()
@i18n<BpPaginationInput>({ key: 'actions' })
export class BpPaginationInput extends LitElement {
  /** determines if element is mutable or focusable */
  @property({ type: Boolean }) disabled: boolean;

  @property({ type: String }) name: string;

  /** determines initial value of the control */
  @property({ type: Number }) value = 1;

  /** defines the greatest value in the range of permitted values */
  @property({ type: Number }) max = 1;

  /** determines the current page size */
  @property({ type: Number }) size = 10;

  @property({ type: Array, attribute: 'size-options' }) sizeOptions: number[] = [];

  /** set default aria/i18n strings */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  static formAssociated = true;

  static styles = [baseStyles, styles];

  declare _internals: ElementInternals;

  render() {
    return html`
      <section part="internal">
        <bp-pagination aria-label="pagination">
          ${this.sizeOptions.length
            ? html` <bp-select
                slot="page-size"
                .value=${this.size.toString()}
                .ariaLabel=${this.i18n.pageSize}
                @input=${this.#sizeChange}>
                ${this.sizeOptions.map(i => html`<bp-option value=${i} ?selected=${i === this.size}>${i}</bp-option>`)}
              </bp-select>`
            : ''}
          <bp-button-icon
            slot="first"
            .ariaLabel=${this.i18n.firstPage}
            .disabled=${this.value === 1}
            @click=${this.#firstPage}></bp-button-icon>
          <bp-button-icon
            slot="prev"
            .ariaLabel=${this.i18n.previousPage}
            .disabled=${this.value === 1}
            @click=${this.#prevPage}></bp-button-icon>
          <bp-field novalidate>
            <bp-input
              type="number"
              size=${numDigits(this.value)}
              min="1"
              value=${this.value}
              max=${this.max}
              .ariaLabel=${`${this.value} of ${this.max}`}
              @input=${this.#setPage}></bp-input>
            <bp-field-message>/ ${this.max}</bp-field-message>
          </bp-field>
          <bp-button-icon
            slot="next"
            .ariaLabel=${this.i18n.nextPage}
            ?disabled=${this.value === this.max}
            @click=${this.#nextPage}></bp-button-icon>
          <bp-button-icon
            slot="last"
            .ariaLabel=${this.i18n.lastPage}
            ?disabled=${this.value === this.max}
            @click=${this.#lastPage}></bp-button-icon>
        </bp-pagination>
      </section>
    `;
  }

  #setPage(event: any) {
    this.#pageChange((event.target as HTMLInputElement).valueAsNumber);
  }

  #nextPage() {
    this.#pageChange(this.value + 1);
  }

  #prevPage() {
    this.#pageChange(this.value - 1);
  }

  #firstPage() {
    this.#pageChange(1);
  }

  #lastPage() {
    this.#pageChange(this.max);
  }

  #pageChange(value: number) {
    // only update value statefully if name is set for form participation
    if (this.name) {
      this.value = value;
    }

    this._internals.setFormValue(`${value}`);
    this.dispatchEvent(new Event('input', { bubbles: true }));
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  #sizeChange(e: InputEvent) {
    const detail = parseInt((e.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent('size', { detail }));
  }
}
