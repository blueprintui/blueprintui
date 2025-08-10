import { grid } from '../examples.data.js';

export const metadata = {
  name: 'clipboard',
  elements: ['bp-grid']
};

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/clipboard.js';
    </script>
    <bp-grid aria-label="example datagrid">
      <bp-grid-header>
        ${grid.columns.slice(0, 4).map(() => /* html */`<bp-grid-column>col</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 3).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.slice(0, 4).map(() => /* html */`<bp-grid-cell>cell</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}
