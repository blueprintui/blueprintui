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
    import '@blueprintui/grid/include/column-alignment.js';
  </script>
  <bp-grid aria-label="column align center demo">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column alignment="center">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
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
    import '@blueprintui/grid/include/column-alignment.js';
  </script>
  <bp-grid aria-label="column align end demo">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column alignment="end">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function alignStart() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/column-alignment.js';
  </script>
  <bp-grid aria-label="column align end demo">
    <bp-grid-header>
      ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
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
    <bp-grid-header>
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i < 2 ? '150' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function contentWrap() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="column fixed width demo">
    <bp-grid-header>
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map((row, ri) => /* html */`
    <bp-grid-row>
      ${row.cells.map((cell, ci) => /* html */`<bp-grid-cell>${ci === 2 && ri === 2 ? 'asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf asdf' : cell.value}</bp-grid-cell>`).join('\n')}
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
    <bp-grid-header>
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i < 2 ? '15%' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
    ${grid.rows.map(row => /* html */`
    <bp-grid-row>
      ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
    </bp-grid-row>`).join('\n')}
  </bp-grid>
  `;
}

export function horizontalScroll() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="horizontal scroll demo" style="max-width: 600px">
    <bp-grid-header>
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
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
    <bp-grid-header>
      ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="${i > 2 ? '100' : ''}">${column.label}</bp-grid-column>`).join('\n')}
    </bp-grid-header>
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
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 0 ? 'position="fixed"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
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
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 0 || i === grid.columns.length - 1 ? 'position="fixed"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
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
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column width="200" ${i === 1 ? 'position="sticky"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
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
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column ${i === 4 ? 'hidden' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 4 ? 'hidden' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      <bp-grid-footer>
        <bp-button-icon id="column-visibility-btn" shape="view-columns" action="flat" popovertarget="column-visibility" aria-label="column visibility filter"></bp-button-icon>
      </bp-grid-footer>
    </bp-grid>
    <bp-dropdown id="column-visibility" anchor="column-visibility-btn" position="top-start">
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
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column>${column.label} ${i === 0 ? /* html */`<bp-button-icon id="column-filter-btn" shape="filter" action="flat" bp-layout="inline:end"></bp-button-icon>` : ''}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
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
        <bp-grid-header>
          ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
        </bp-grid-header>
        ${grid.rows.map(row => /* html */`
        <bp-grid-row>
          ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
      </bp-grid>
    </section>
  `;
}

export function columnSpan() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
  </script>
  <bp-grid aria-label="column span demo" column-style="border" row-style="border">
    <bp-grid-header>
      <bp-grid-column>Column 0</bp-grid-column>
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
    </bp-grid-header>

    <bp-grid-row>
      <bp-grid-cell>Cell 0-0</bp-grid-cell>
      <bp-grid-cell>Cell 0-1</bp-grid-cell>
      <bp-grid-cell>Cell 0-2</bp-grid-cell>
      <bp-grid-cell>Cell 0-3</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell aria-colspan="2" style="grid-column: 1 / span 2">Cell 1-0</bp-grid-cell>
      <bp-grid-cell>Cell 1-2</bp-grid-cell>
      <bp-grid-cell>Cell 1-3</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell>Cell 2-0</bp-grid-cell>
      <bp-grid-cell>Cell 2-1</bp-grid-cell>
      <bp-grid-cell>Cell 2-2</bp-grid-cell>
      <bp-grid-cell>Cell 2-3</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell>Cell 3-0</bp-grid-cell>
      <bp-grid-cell>Cell 3-1</bp-grid-cell>
      <bp-grid-cell>Cell 3-2</bp-grid-cell>
      <bp-grid-cell>Cell 3-3</bp-grid-cell>
    </bp-grid-row>
  </bp-grid>
  `;
}

export function columnGroups() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/column-alignment.js';
  </script>
  <bp-grid aria-label="column span demo" column-style="border" row-style="border">
    <bp-grid-header>
      <bp-grid-column alignment="center" aria-colspan="2" style="grid-column: 1/span 2">Group 1</bp-grid-column>
      <bp-grid-column alignment="center" aria-colspan="3" style="grid-column: 3/span 3">Group 2</bp-grid-column>
    </bp-grid-header>

    <bp-grid-header>
      <bp-grid-column>Column 0</bp-grid-column>
      <bp-grid-column>Column 1</bp-grid-column>
      <bp-grid-column>Column 2</bp-grid-column>
      <bp-grid-column>Column 3</bp-grid-column>
      <bp-grid-column>Column 4</bp-grid-column>
    </bp-grid-header>

    <bp-grid-row>
      <bp-grid-cell>Cell 0-0</bp-grid-cell>
      <bp-grid-cell>Cell 0-1</bp-grid-cell>
      <bp-grid-cell>Cell 0-2</bp-grid-cell>
      <bp-grid-cell>Cell 0-3</bp-grid-cell>
      <bp-grid-cell>Cell 0-4</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell>Cell 1-0</bp-grid-cell>
      <bp-grid-cell>Cell 1-1</bp-grid-cell>
      <bp-grid-cell>Cell 1-2</bp-grid-cell>
      <bp-grid-cell>Cell 1-3</bp-grid-cell>
      <bp-grid-cell>Cell 1-4</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell>Cell 2-0</bp-grid-cell>
      <bp-grid-cell>Cell 2-1</bp-grid-cell>
      <bp-grid-cell>Cell 2-2</bp-grid-cell>
      <bp-grid-cell>Cell 2-3</bp-grid-cell>
      <bp-grid-cell>Cell 2-4</bp-grid-cell>
    </bp-grid-row>

    <bp-grid-row>
      <bp-grid-cell>Cell 3-0</bp-grid-cell>
      <bp-grid-cell>Cell 3-1</bp-grid-cell>
      <bp-grid-cell>Cell 3-2</bp-grid-cell>
      <bp-grid-cell>Cell 3-3</bp-grid-cell>
      <bp-grid-cell>Cell 3-4</bp-grid-cell>
    </bp-grid-row>
  </bp-grid>
  `;
}