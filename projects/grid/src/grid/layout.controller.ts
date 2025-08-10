import { ReactiveController, ReactiveControllerHost } from 'lit';
import { isNumericString, listenForAttributeListChange } from '@blueprintui/components/internals';
import { onChildListMutation } from '@blueprintui/grid/internals';

export type Column = HTMLElement & {
  width: string;
  _internals: ElementInternals;
};

type Grid = HTMLElement & {
  gridLayoutControllerConfig: {
    columns: NodeListOf<Column> | Column[];
    columnLayout: 'fixed' | 'flex';
    height?: string;
  };
};

export class GridLayoutController implements ReactiveController {
  #observers: MutationObserver[] = [];

  #_columns: NodeListOf<Column> | Column[];
  get #columns() {
    return Array.from(this.#_columns ?? []);
  }

  get #config() {
    return this.host.gridLayoutControllerConfig;
  }

  get #visibleColumns() {
    return this.#columns.filter(c => !c.hidden);
  }

  get #lastVisibleColumn() {
    return this.#visibleColumns[this.host.getAttribute('dir') === 'rtl' ? 0 : this.#visibleColumns.length - 1];
  }

  constructor(private host: ReactiveControllerHost & Grid) {
    this.host.addController(this);
  }

  async hostConnected() {
    await this.host.updateComplete;
    this.#updateLayout();
    this.host.addEventListener('resize-input', () => this.#initializeColumnWidths(), { once: true, capture: true });

    this.#observers.push(
      onChildListMutation(this.host, async mutation => {
        await this.host.updateComplete;
        if (mutation && this.#columnAddedOrRemoved(mutation)) {
          this.#updateLayout();
        }
      })
    );

    this.#observers.push(listenForAttributeListChange(this.host, ['hidden'], () => this.#updateLayout()));
  }

  hostUpdated() {
    if (this.#config.height) {
      this.host.style.setProperty(
        '--body-height',
        isNumericString(this.#config.height) ? `${this.#config.height}px` : this.#config.height
      );
    }
  }

  hostDisconnected() {
    this.#observers.forEach(o => o.disconnect());
  }

  #columnAddedOrRemoved(mutation: MutationRecord) {
    return [...Array.from(mutation.removedNodes), ...Array.from(mutation.addedNodes)].find(
      (i: any) => i.tagName === 'BP-GRID-COLUMN'
    );
  }

  #initializeColumnWidths() {
    if (this.#config.columnLayout === 'fixed') {
      this.#visibleColumns
        .filter(c => c.width)
        .forEach(c =>
          this.host.style.setProperty(`--ch${c.ariaColIndex}`, isNumericString(c.width) ? `${c.width}px` : c.width)
        );

      this.#visibleColumns
        .filter(c => !c.width && parseInt(c.ariaColIndex) !== this.#columns.length)
        .forEach(c => this.host.style.setProperty(`--ch${c.ariaColIndex}`, `${parseInt(getComputedStyle(c).width)}px`));

      this.host.style.setProperty(
        `--ch${this.#lastVisibleColumn.ariaColIndex}`,
        `minmax(${
          this.#getLastColumnWidth() ?? `${parseInt(getComputedStyle(this.#lastVisibleColumn).width)}px`
        }, 100%)`
      );
    }
  }

  #getLastColumnWidth() {
    if (isNumericString(this.#lastVisibleColumn.width)) {
      return `${this.#lastVisibleColumn.width}px`;
    } else {
      return this.#lastVisibleColumn.width ? this.#lastVisibleColumn.width : null;
    }
  }

  #updateLayout() {
    this.#_columns = this.#config.columns; // create copy per update to prevent multiple DOM queries from @query getters
    this.#createColumnGrids();
    this.#setColumnDividers();
  }

  #createColumnGrids() {
    const colWidths = this.#columns
      .filter(c => !c.hidden && !c.ariaColSpan)
      .reduce((p, c, i) => {
        const width = isNumericString(c.width) ? `${c.width}px` : c.width;
        return `${p} ${`var(--ch${i + 1}, ${width ? width : '1fr'})`}`;
      }, '');

    this.host.style.setProperty('--ch-grid', colWidths);
  }

  #setColumnDividers() {
    this.#visibleColumns.forEach(c => c._internals.states.delete('ch-last'));
    this.#lastVisibleColumn?._internals.states.add('ch-last');
  }
}
