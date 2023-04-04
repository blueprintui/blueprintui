import { getGrid, grid } from '../examples.data.js';

export const metadata = {
  name: 'row',
  elements: ['bp-grid-row', 'bp-grid', 'bp-grid-column', 'bp-grid-cell']
};

export function multiSelect() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/checkbox.js';
    </script>
    <bp-grid aria-label="multi select datagrid">
      <bp-grid-column width="max-content">
        <bp-checkbox aria-label="select all"></bp-checkbox>
      </bp-grid-column>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-checkbox aria-label="select row" ${i === 2 || i === 4 ? 'checked' : ''}></bp-checkbox>
        </bp-grid-cell>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}

export function singleSelect() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/radio.js';
    </script>
    <bp-grid aria-label="single select datagrid">
      <bp-grid-column width="max-content"></bp-grid-column>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-radio aria-label="select row" ${i === 2 ? 'checked' : ''} value="${i}" name="row"></bp-radio>
        </bp-grid-cell>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}

export function height() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="row height datagrid" style="--row-height: 64px; --column-height: 64px; --body-height: 420px;">
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}

export function action() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/button-icon.js';
    </script>
    <bp-grid aria-label="row action datagrid">
      <bp-grid-column width="max-content"></bp-grid-column>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row>
        <bp-grid-cell>
          <bp-button-icon onClick="alert('!')"></bp-button-icon>
        </bp-grid-cell>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}

export function actionBulk() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/checkbox.js';
      import '@blueprintui/components/include/search.js';
      import '@blueprintui/components/include/button-icon-group.js';
      import '@blueprintui/icons/shapes/highlighter.js';
      import '@blueprintui/icons/shapes/attachment.js';
      import '@blueprintui/icons/shapes/add.js';
      import '@blueprintui/icons/shapes/trash.js';
    </script>
    <section bp-layout="block gap:xs">
      <div bp-layout="inline gap:xs">
        <bp-search aria-label="search column" placeholder="search" style="width: 250px"></bp-search>
        <bp-button-icon-group>
          <bp-button-icon shape="add" aria-label="add"></bp-button-icon>
          <bp-button-icon shape="attachment" aria-label="attach"></bp-button-icon>
          <bp-button-icon shape="highlighter" aria-label="highlight"></bp-button-icon>
        </bp-button-icon-group>
        <bp-button-icon-group bp-layout="inline:end">
          <bp-button-icon shape="trash" aria-label="delete"></bp-button-icon>
        </bp-button-icon-group>
      </div>
      <bp-grid aria-label="row action datagrid">
        <bp-grid-column width="max-content">
          <bp-checkbox aria-label="select all"></bp-checkbox>
        </bp-grid-column>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
        ${grid.rows.map((row, i) => /* html */`
        <bp-grid-row>
          <bp-grid-cell>
            <bp-checkbox aria-label="select row" ${i === 2 || i === 4 ? 'checked' : ''}></bp-checkbox>
          </bp-grid-cell>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')} 
      </bp-grid>
    </section>
  `;
}

export function sticky() {
  const grid = getGrid({ columns: 4, rows: 100 });
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/row-position.js';
    </script>
    <bp-grid aria-label="row sticky datagrid demo" height="390">
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row ${i === 0 || !(i % 5) ? 'position="sticky"' : ''}>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function stripe() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid row-style="stripe" aria-label="row style stripe datagrid demo">
    ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function fixed() {
  const grid = getGrid({ columns: 4, rows: 20 });
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/row-position.js';
    </script>
    <bp-grid aria-label="row fixed datagrid demo" height="390">
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row ${i === 0 ? 'position="fixed"' : ''}>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function sort() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/button-sort.js';
    </script>
    <bp-grid aria-label="row sort datagrid demo" height="390">
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column>${column.label} ${i === 0 ? /* html */`<bp-button-sort onClick="alert('sort')" aria-label="sort"></bp-button-sort>` : ''}</bp-grid-column>`).join('\n')}
      ${grid.rows.map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function groups() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/hover.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/components/include/button-icon.js';
      import '@blueprintui/components/include/button-expand.js';
    </script>
    <bp-grid aria-label="row groups datagrid" row-style="hover">
      <bp-grid-column width="max-content"></bp-grid-column>
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
      <bp-grid-row>
        <bp-grid-cell><bp-button-expand aria-label="expand group 0"></bp-button-expand></bp-grid-cell>
        <bp-grid-cell>Cell 0-0</bp-grid-cell>
        <bp-grid-cell>Cell 0-0</bp-grid-cell>
        <bp-grid-cell>Cell 0-0</bp-grid-cell>
        <bp-grid-cell>Cell 0-0</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell><bp-button-expand aria-label="expand group 1" checked></bp-button-expand></bp-grid-cell>
        <bp-grid-cell>Cell 1-0</bp-grid-cell>
        <bp-grid-cell>Cell 1-0</bp-grid-cell>
        <bp-grid-cell>Cell 1-0</bp-grid-cell>
        <bp-grid-cell>Cell 1-0</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell aria-label="group 1-1"></bp-grid-cell>
        <bp-grid-cell>Cell 1-1</bp-grid-cell>
        <bp-grid-cell>Cell 1-1</bp-grid-cell>
        <bp-grid-cell>Cell 1-1</bp-grid-cell>
        <bp-grid-cell>Cell 1-1</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell aria-label="group 1-2"></bp-grid-cell>
        <bp-grid-cell>Cell 1-2</bp-grid-cell>
        <bp-grid-cell>Cell 1-2</bp-grid-cell>
        <bp-grid-cell>Cell 1-2</bp-grid-cell>
        <bp-grid-cell>Cell 1-2</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell><bp-button-expand aria-label="expand group 2"></bp-button-expand></bp-grid-cell>
        <bp-grid-cell>Cell 2-0</bp-grid-cell>
        <bp-grid-cell>Cell 2-0</bp-grid-cell>
        <bp-grid-cell>Cell 2-0</bp-grid-cell>
        <bp-grid-cell>Cell 2-0</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row hidden>
        <bp-grid-cell aria-label="group 2-1"></bp-grid-cell>
        <bp-grid-cell>Cell 2-1</bp-grid-cell>
        <bp-grid-cell>Cell 2-1</bp-grid-cell>
        <bp-grid-cell>Cell 2-1</bp-grid-cell>
        <bp-grid-cell>Cell 2-1</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell><bp-button-expand aria-label="expand group 3"></bp-button-expand></bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row hidden>
        <bp-grid-cell aria-label="group 3-0"></bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
        <bp-grid-cell>Cell 3-0</bp-grid-cell>
      </bp-grid-row>
    </bp-grid>
  `;
}