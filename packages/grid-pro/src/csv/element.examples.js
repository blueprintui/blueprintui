import { grid, getGrid } from '../examples.data.js';

export const metadata = {
  name: 'pro csv',
  elements: ['bp-grid']
};

export function csvExport() {
  return /* html */`
    <div bp-layout="block gap:md">
      <bp-grid aria-label="csv datagrid demo">
        <bp-grid-header>
          ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
        </bp-grid-header>
        ${grid.rows.slice(0, 6).map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
      <bp-button action="outline" size="sm">Download CSV</bp-button>
    </div>
    <script type="module">
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/grid/include/core.js';
      import { exportCSV, downloadCSV } from '@blueprintui/grid-pro/csv';

      const grid = document.querySelector('bp-grid');
      const button = document.querySelector('bp-button');
      button.addEventListener('click', () => downloadCSV(grid));
      console.log(exportCSV(grid));
    </script>
  `;
}

export function csvEditor() {
  const csvGrid = getGrid({ columns: 20, rows: 100 });
  return /* html */`
    <style>
      body {
        padding: 0;
      }
    </style>
    <div bp-layout="block gap:md">
      <bp-button action="outline" size="sm">Download CSV</bp-button>
      <bp-grid range-selection column-style="border" row-style="border" aria-label="csv datagrid demo">
        <bp-grid-header>
          ${csvGrid.columns.map(column => /* html */`<bp-grid-column width="200">
            ${column.label}
            <bp-button-resize step="10"></bp-button-resize>
          </bp-grid-column>`).join('\n')}
        </bp-grid-header>
        ${csvGrid.rows.map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
    </div>
    <script type="module">
      import '@blueprintui/components/include/button.js';
      import '@blueprintui/components/include/button-resize.js';
      import '@blueprintui/grid-pro/include/range-selection.js';
      import '@blueprintui/grid-pro/include/column-resize.js';
      import '@blueprintui/grid-pro/include/column-resize.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/core.js';
      import { exportCSV, downloadCSV } from '@blueprintui/grid-pro/csv/index.js';

      const grid = document.querySelector('bp-grid');
      const button = document.querySelector('bp-button');
      button.addEventListener('click', () => downloadCSV(grid));
      console.log(exportCSV(grid));
    </script>
  `;
}