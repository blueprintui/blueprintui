import { grid } from '../examples.data.js';

export const metadata = {
  name: 'pagination',
  elements: ['bp-grid-pagination', 'bp-grid']
};

export function pagination() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid/include/pagination.js';
    </script>
    <bp-grid aria-label="pagination datagrid">
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.slice(0, 7).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer>
        <bp-grid-pagination page-count="10" page="2"></bp-grid-pagination>
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
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
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
