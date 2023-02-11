import { grid } from '../examples.data.js';

export const metadata = {
  name: 'pro draggable columns',
  elements: ['bp-grid']
};

export function draggableColumns() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid-pro/include/draggable-column.js';
      import '@blueprintui/components/include/button-handle.js';
      
      document.querySelector('bp-grid').addEventListener('bp-crane-drop', e => {
        e.detail.target.parentElement.insertBefore(e.detail.source, e.detail.target);
      });
    </script>
    <section bp-layout="block gap:xs">
      <bp-grid column-layout="flex" row-style="border" aria-label="draggable column datagrid demo" height="390" style="max-width: 800px">
        <bp-grid-header>
          ${grid.columns.map(column => /* html */`
          <bp-grid-column>
            ${column.label}
            <bp-button-handle></bp-button-handle>
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
