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
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
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
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
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
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}
