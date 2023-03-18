import { grid } from '../examples.data.js';

export const metadata = {
  name: 'cell',
  elements: ['bp-grid-cell', 'bp-grid', 'bp-grid-column', 'bp-grid-row']
};

export function cell() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid border-style="cell" aria-label="border cell datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function column() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid border-style="column" aria-label="border column datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function row() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid border-style="row" aria-label="border none datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function none() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid border-style="none" aria-label="border style none datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}