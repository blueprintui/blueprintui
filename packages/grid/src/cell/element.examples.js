import { grid } from '../examples.data.js';

export const metadata = {
  name: 'cell',
  elements: ['bp-grid-cell', 'bp-grid', 'bp-grid-column', 'bp-grid-row']
};

export function border() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid column-style="border" row-style="border" aria-label="border cell datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function columnBorder() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid column-style="border hover" aria-label="border column datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function rowBorder() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid row-style="border" aria-label="border none datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function noBorder() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="style none datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function hover() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/hover.js';
  </script>
  <bp-grid row-style="hover" column-style="hover" aria-label="hover datagrid demo" style="max-width: 700px">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function columnHover() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/hover.js';
  </script>
  <bp-grid column-style="hover" aria-label="column style hover datagrid demo" style="max-width: 700px">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function rowHover() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/hover.js';
  </script>
  <bp-grid row-style="hover" aria-label="row style hover datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}
