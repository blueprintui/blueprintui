import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { baseStyles, elevationStyles, createId, I18nService, ariaMultiSelectable, i18n, attachRootNodeStyles } from '@blueprintui/components/internals';
import { interactionScrollVisibility } from '../internals/controllers/interaction-scroll-visibility.controller.js';
import { BpGridRow } from '../row/element.js';
import { BpGridCell } from '../cell/element.js';
import { BpGridColumn } from '../column/element.js';
import { GridLayoutController } from './layout.controller.js';
import { BpGridPlaceholder } from '../placeholder/element.js';
import { BpGridFooter } from '../footer/element.js';
import styles from './element.css' assert { type: 'css' };
import globalStyles from './global.css' assert { type: 'css' };

/**
 * Grid
 *
 * ```typescript
 * import '@blueprintui/grid/include/core.js';
 * ```
 *
 * @element bp-grid
 * @cssprop --background
 * @cssprop --body-height
 * @cssprop --scrollbar-background
 * @cssprop --scrollbar-thumb-background
 * @cssprop --column-height
 * @cssprop --row-height
 * @cssprop --scroll-padding-top
 * @cssprop --row-content-visibility
 * @cssprop --column-text-align
 * @cssprop --cell-text-algin
 */
@i18n<BpGrid>({ key: 'actions' })
@ariaMultiSelectable<BpGrid>()
@interactionScrollVisibility<BpGrid>()
export class BpGrid extends LitElement {
  /** i18n string options */
  @property({ type: Object }) i18n = I18nService.keys.actions;

  /** max height for grid container */
  @property({ type: String, reflect: true }) height: string;

  /** column layout determines initial column width calculation */
  @property({ type: String, reflect: true, attribute: 'column-layout' }) columnLayout: 'fixed' | 'flex' = 'fixed';

  /** determines the visual style of grid cells and rows */
  @property({ type: String, reflect: true }) borders: 'row' | 'cell' | 'column' | 'none' | 'stripe' = 'row';

  /** initializes grid to appropriate aria/a11y settings for selections */
  @property({ type: String, reflect: true }) selectable: 'multi' | 'single' | null;
  
  /** disables scroll container */
  @property({ type: Boolean, reflect: true, attribute: 'scroll-lock' }) scrollLock = false;
  
  @property({ type: Boolean, reflect: true, attribute: 'range-selection' }) rangeSelection = false;

  @property({ type: String, reflect: true }) elevation: 'raised' | 'flat';

  @property({ type: String, reflect: true }) protected _id = createId();

  protected gridLayoutController = new GridLayoutController(this);

  static styles = [baseStyles, elevationStyles, styles];

  /** @private */
  static controllers: Set<any> = new Set();

  /** @private */
  get gridLayoutControllerConfig() {
    return {
      columns: Array.from(this.#columns),
      columnLayout: this.columnLayout,
      height: this.height
    }
  }

  /** @private */
  get gridColumnSizeControllerConfig() {
    return {
      columns: Array.from(this.#columns),
      rows: Array.from(this.#rows),
    }
  }

  get #columns() {
    return this.querySelectorAll<BpGridColumn>('bp-grid-column');
  }

  get #rows() {
    return this.querySelectorAll<BpGridRow>('bp-grid-row');
  }

  get #cells() {
    return this.querySelectorAll<BpGridCell>('bp-grid-cell');
  }

  get #placeholder() {
    return this.querySelector<BpGridPlaceholder>('bp-grid-placeholder');
  }

  get #footer() {
    return this.querySelector<BpGridFooter>('bp-grid-footer');
  }

  /** @private */
  get keyNavGrid() {
    return this.shadowRoot.querySelector<HTMLElement>('.scroll-container');
  }

  /** @private */
  get grid(): HTMLElement[][] {
    const cells = [...Array.from(this.#columns), ...Array.from(this.#cells)];
    const columns = this.#columns.length;
    const grid = [];
    while(cells.length) {
      grid.push(cells.splice(0, columns));
    }
    return grid;
  }

  _internals = this.attachInternals();

  render() {
    return html`
      <div role="presentation" elevation part="internal">
        <div role="presentation" class="scroll-container">
          <div role="presentation" class="column-row-group">
            <div role="row" aria-rowindex="1" class="column-row">
              <slot name="columns">
                <bp-grid-column draggable-hidden>
                  <span sr-only>${this.i18n.noData}</span>
                </bp-grid-column>
              </slot>
            </div>
          </div>
          <slot role="presentation" class="body-row-group"></slot>
        </div>
        <slot name="footer"></slot>
        <slot name="detail"></slot>
      </div>`;
  }

  constructor() {
    super();
    this._internals.role = 'grid';
    this.#intializeColumnSort();
  }
  
  async connectedCallback() {
    super.connectedCallback();
    attachRootNodeStyles(this.parentNode, [globalStyles]);
    await this.updateComplete;
    BpGrid.controllers.forEach(C => new C(this));
    this.#update(); // way to get rid of without breaking range?
    this.shadowRoot.addEventListener('slotchange', () => this.updateComplete.then(() => this.#update()));
  }

  #intializeColumnSort() {
    this.addEventListener('sort', (e: any) => {
      const col = e.composedPath().find((i: HTMLElement) => i.tagName === 'BP-GRID-COLUMN');
      if (col) {
        col.ariaSort = e.detail;
      }
    });
  }

  #updates = 0;
  get #isStatic() {
    this.#updates++;
    return this.#updates === 1 && !this.rangeSelection && !Array.from(this.#columns).find(c => c.position !== '' || c.type !== undefined);
  }

  async #update() {
    if (!this.#isStatic) {
      this.#initializeGrid();
      this.#intializeColumns();
      this.#initializeRows();
      this.#initializeCells();
      this.#initializePlaceholder();
      this.#intializeFooter();
    }
  }

  #initializeGrid() {
    const columnRowCount = 1;
    const rowCountOrDefault = Math.max(this.#rows?.length, 1);
    const footerRowCountOrDefault = this.#footer ? 1 : 0;
    this._internals.ariaRowCount = `${columnRowCount + rowCountOrDefault + footerRowCountOrDefault}`;
    this._internals.ariaColCount = `${this.#columns.length}`;
  }

  #intializeColumns() {
    this.#columns.forEach((c, i) => c.ariaColIndex = `${i + 1}`);
  }

  #initializeRows() {
    this.#rows?.forEach((r, i) => r.ariaRowIndex = `${i + 2}`); // +2 for column header row offset
  }

  /**
   * Cells with focusable items use table navigation ctrl+alt+arrow
   * https://github.com/nvaccess/nvda/issues/7718
   */
  #initializeCells() {
    this.#cells?.forEach((c, i) => c.ariaColIndex = `${(i % this.#columns.length) + 1}`);
  }

  #initializePlaceholder() {
    if (this.#placeholder) {
      this.#placeholder.ariaRowCount = `${this.#rows.length + 1}`;
      this.#placeholder._colSpan = this._internals.ariaColCount;
    }
  }

  #intializeFooter() {
    if (this.#footer) {
      this.#footer.ariaRowCount = `${this.#rows.length + 2}`;
      this.#footer._colSpan = this._internals.ariaColCount;
    }
  }
}
