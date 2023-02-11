import { grid } from '../examples.data.js';

export const metadata = {
  name: 'pro range selection',
  elements: ['bp-grid']
};

export function rangeSelection() {
  return /* html */`
    <bp-grid range-selection row-style="border" column-style="border" aria-label="range selection datagrid demo" height="360">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
    <script type="module">
      import '@blueprintui/grid-pro/include/range-selection.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/core.js';

      const grid = document.querySelector('bp-grid');
      grid.addEventListener('range-input', e => console.log('range-input', e.detail));
      grid.addEventListener('range-change', e => console.log('range-change', e.detail));
    </script>
  `;
}
