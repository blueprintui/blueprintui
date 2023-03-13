import { grid } from '../examples.data.js';

export const metadata = {
  name: 'column',
  elements: ['bp-grid-column', 'bp-grid', 'bp-grid-row', 'bp-grid-cell']
};

export function alignCenter() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid column-align="center" aria-label="column align center demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function alignEnd() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid column-align="end" aria-label="column align end demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function fixedWidth() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="column fixed width demo">
    ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i < 2 ? '150' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function percentageWidth() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="column fixed width demo">
    ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i < 2 ? '15%' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function overflow() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="column fixed width demo">
    ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i > 2 ? '100' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map((cell, i) => /* html */`<bp-grid-cell>${i > 2 ? /* html */`<span style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">${cell.value}.000000%</span>` : cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function positionFixed() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-position.js';
    </script>
    <bp-grid aria-label="fixed column datagrid demo" style="width: 760px">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 0 ? 'position="fixed"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function positionMultiFixed() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-position.js';
    </script>
    <bp-grid aria-label="fixed column datagrid demo" style="width: 760px">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 0 || i === grid.columns.length - 1 ? 'position="fixed"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function positionSticky() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-position.js';
    </script>
    <bp-grid aria-label="fixed column datagrid demo" style="width: 700px">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 1 ? 'position="sticky"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function columnVisibility() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/view-columns.js';
      import '@blueprintui/components/include/checkbox.js';
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <bp-grid aria-label="fixed column datagrid demo">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column ${i === 4 ? 'hidden' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 4 ? 'hidden' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      <bp-grid-footer>
        <bp-button-icon shape="view-columns" id="column-visibility-btn" aria-label="column visibility filter"></bp-button-icon>
      </bp-grid-footer>
    </bp-grid>
    <bp-dropdown anchor="column-visibility-btn" position="top-start">
      <bp-fieldset layout="vertical" style="width: 150px">
        <label>columns</label>
        <label>column 0</label>
        <bp-checkbox value="0" checked></bp-checkbox>
        <label>column 1</label>
        <bp-checkbox value="1" checked></bp-checkbox>
        <label>column 2</label>
        <bp-checkbox value="2" checked></bp-checkbox>
        <label>column 3</label>
        <bp-checkbox value="3" checked></bp-checkbox>
        <label>column 4</label>
        <bp-checkbox value="4"></bp-checkbox>
      </bp-fieldset>
    </bp-dropdown>
  `;
}

export function columnFilter() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/icons/include.js';
      import '@blueprintui/icons/shapes/filter.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/components/include/dropdown.js';
      import '@blueprintui/components/include/search.js';
    </script>
    <bp-grid aria-label="column filter datagrid demo" height="390">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column>${column.label} ${i === 0 ? /* html */`<bp-button-icon id="column-filter-btn" shape="filter"></bp-button-icon>` : ''}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
    <bp-dropdown anchor="column-filter-btn" position="bottom-start">
      <bp-search aria-label="search column" placeholder="search"></bp-search>
    </bp-dropdown>
  `;
}

export function columnFilterMulti() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/search.js';
    </script>
    <section bp-layout="block gap:xs">
      <bp-search aria-label="search column" placeholder="search" bp-layout="m-b:xs"></bp-search>
      <bp-grid aria-label="column filter multi datagrid demo" height="390">
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
        ${grid.rows.map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
    </section>
  `;
}
