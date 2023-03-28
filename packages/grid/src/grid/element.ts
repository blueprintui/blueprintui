import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import {
  baseStyles,
  elevationStyles,
  createId,
  I18nService,
  ariaMultiSelectable,
  i18n,
  attachRootNodeStyles,
  dynamicControllers
} from '@blueprintui/components/internals';
import type { Permutations } from '../internals/index.js';
import { interactionScrollVisibility } from '../internals/index.js';
import { GridLayoutController } from './layout.controller.js';
import { GridDOMController } from './dom.controller.js';
import styles from './element.css' assert { type: 'css' };
import globalStyles from './element.global.css' assert { type: 'css' };

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
 */
@dynamicControllers()
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

  /** determines the visual style for rows */
  @property({ type: String, reflect: true, attribute: 'row-style' }) rowStyle: Permutations<
    'hover' | 'stripe' | 'border'
  >;

  /** determines the visual style for columns */
  @property({ type: String, reflect: true, attribute: 'column-style' }) columnStyle: Permutations<'hover' | 'border'>;

  /** initializes grid to appropriate aria/a11y settings for selections */
  @property({ type: String, reflect: true }) selectable: 'multi' | 'single' | null;

  /** disables scroll container */
  @property({ type: Boolean, reflect: true, attribute: 'scroll-lock' }) scrollLock = false;

  @property({ type: String, reflect: true }) elevation: 'raised' | 'flat' = 'flat';

  /** @private enables range selection */
  @property({ type: Boolean, reflect: true, attribute: 'range-selection' }) rangeSelection = false;

  /** @private enables range selection */
  @property({ type: String, reflect: true }) _id = createId();

  protected gridLayoutController = new GridLayoutController(this);

  static styles = [baseStyles, elevationStyles, styles];

  /** @private */
  get gridLayoutControllerConfig() {
    return {
      columns: this.#DOMController.columns,
      columnLayout: this.columnLayout,
      height: this.height
    };
  }

  #DOMController: GridDOMController;

  get grid(): HTMLElement[][] {
    return this.#DOMController.grid;
  }

  /** @private */
  get keyNavGrid() {
    return this.shadowRoot.querySelector<HTMLElement>('.scroll-container');
  }

  _internals = this.attachInternals();

  render() {
    return html` <div role="presentation" elevation layer part="internal">
      <div role="presentation" class="scroll-container">
        <div role="presentation" class="column-row-group">
          <div role="row" aria-rowindex="1" class="column-row">
            <slot name="columns">
              <bp-grid-column>
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
    this.#DOMController = new GridDOMController(this);
    this._internals.role = 'grid';
    this.#intializeColumnSort();
  }

  async connectedCallback() {
    super.connectedCallback();
    attachRootNodeStyles(this.parentNode, [globalStyles]);
    await this.updateComplete;
    this.shadowRoot.addEventListener('bp-grid:slotchange', () => this.#update());
    this.#update();
  }

  #intializeColumnSort() {
    this.addEventListener('sort', (e: any) => {
      const col = e.composedPath().find((i: HTMLElement) => i.tagName === 'BP-GRID-COLUMN');
      if (col) {
        col.ariaSort = e.detail;
      }
    });
  }

  async #update() {
    if (!this.#DOMController.isStatic) {
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
    const rowCountOrDefault = Math.max(this.#DOMController.rows?.length, 1);
    const footerRowCountOrDefault = this.#DOMController.footer ? 1 : 0;
    this._internals.ariaRowCount = `${columnRowCount + rowCountOrDefault + footerRowCountOrDefault}`;
    this._internals.ariaColCount = `${this.#DOMController.columns.length}`;
  }

  #intializeColumns() {
    this.#DOMController.columns.forEach((c, i) => (c.ariaColIndex = `${i + 1}`));
  }

  #initializeRows() {
    this.#DOMController.rows?.forEach((r, i) => (r.ariaRowIndex = `${i + 2}`)); // +2 for column header row offset
  }

  /** cells with focusable items use table navigation ctrl+alt+arrow https://github.com/nvaccess/nvda/issues/7718 */
  #initializeCells() {
    this.#DOMController.cells?.forEach((c, i) => (c.ariaColIndex = `${(i % this.#DOMController.columns.length) + 1}`));
  }

  #initializePlaceholder() {
    if (this.#DOMController.placeholder) {
      this.#DOMController.placeholder.ariaRowCount = `${this.#DOMController.rows.length + 1}`;
      this.#DOMController.placeholder._colSpan = this._internals.ariaColCount;
    }
  }

  #intializeFooter() {
    if (this.#DOMController.footer) {
      this.#DOMController.footer.ariaRowCount = `${this.#DOMController.rows.length + 2}`;
      this.#DOMController.footer._colSpan = this._internals.ariaColCount;
    }
  }
}
