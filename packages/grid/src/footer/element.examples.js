import { getGrid, grid } from '../examples.data.js';

export const metadata = {
  name: 'footer',
  elements: ['bp-grid-footer', 'bp-grid']
};

export function footer() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/footer.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="footer datagrid">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
    <bp-grid-footer>
      footer
    </bp-grid-footer>
  </bp-grid>
  `;
}

export function footerActions() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/footer.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="footer actions datagrid">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
    <bp-grid-footer>
      <a bp-text="link" href="https://www.w3.org/TR/wai-aria-practices/examples/grid/dataGrids.html#kbd_label">spec</a>
    </bp-grid-footer>
  </bp-grid>
  `;
}

export function noFooter() {
  const grid = getGrid({ columns: 5, rows: 20 })
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="no footer datagrid" height="390">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function pagination() {
  return /* html */`
    <script type="module">
      import '@blueprintui/components/include/pagination.js';
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
    </script>
    <bp-grid aria-label="pagination datagrid">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer>
        <bp-pagination-input name="pagination" value="2" max="10" size="10" size-options="[10, 50, 100]"></bp-pagination-input>
      </bp-grid-footer>
    </bp-grid>
  `;
}

export function paginationCustom() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/pagination.js';
    </script>
    <bp-grid aria-label="custom pagination datagrid">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer>
        <bp-pagination aria-label="pagination">
          <bp-button-icon slot="first"></bp-button-icon>
          <bp-button-icon slot="prev"></bp-button-icon>
          <bp-field novalidate>
            <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
            <bp-field-message>/ 3</bp-field-message>
          </bp-field>
          <bp-button-icon slot="next"></bp-button-icon>
          <bp-button-icon slot="last"></bp-button-icon>
        </bp-pagination>
      </bp-grid-footer>
    </bp-grid>
  `;
}

export function paginationInput() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/pagination.js';
    </script>
    <bp-grid aria-label="custom pagination datagrid">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 7).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer>
        <bp-pagination aria-label="pagination">
          <bp-button-icon slot="first"></bp-button-icon>
          <bp-button-icon slot="prev"></bp-button-icon>
          <bp-field novalidate>
            <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
            <bp-field-message>/ 3</bp-field-message>
          </bp-field>
          <bp-button-icon slot="next"></bp-button-icon>
          <bp-button-icon slot="last"></bp-button-icon>
        </bp-pagination>
      </bp-grid-footer>
    </bp-grid>
  `;
}
