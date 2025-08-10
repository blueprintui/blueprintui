import { grid } from '../examples.data.js';

export const metadata = {
  name: 'column resize',
  elements: ['bp-grid-column', 'bp-grid']
};

export function resize() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-resize.js';
      import '@blueprintui/components/include/button-resize.js';
    </script>
    <section bp-layout="block gap:xs">
      <bp-grid column-layout="fixed" column-style="border" aria-label="resize column datagrid demo" height="390" style="max-width: 800px">
        <bp-grid-header>
          ${grid.columns.map(column => /* html */`
          <bp-grid-column>
            ${column.label}
            <bp-button-resize step="10"></bp-button-resize>
          </bp-grid-column>`).join('\n')}
        </bp-grid-header>
        ${grid.rows.map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
    </section>
  `;
}

export function resizeFlex() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-resize.js';
      import '@blueprintui/components/include/button-resize.js';
    </script>
    <section bp-layout="block gap:xs">
      <bp-grid column-layout="flex" column-style="border" aria-label="resize flex column datagrid demo" height="390" style="max-width: 800px">
        <bp-grid-header>
          ${grid.columns.map(column => /* html */`
          <bp-grid-column>
            ${column.label}
            <bp-button-resize step="10"></bp-button-resize>
          </bp-grid-column>`).join('\n')}
        </bp-grid-header>
        ${grid.rows.map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
    </section>
  `;
}
