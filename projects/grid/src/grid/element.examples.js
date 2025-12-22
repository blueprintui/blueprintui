import { getGrid, grid } from '../examples.data.js';

export const metadata = {
  name: 'basic',
  elements: ['bp-grid', 'bp-grid-column', 'bp-grid-row', 'bp-grid-cell']
};

export function basic() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="basic datagrid">
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

export function keynav() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="keyboard navigation datagrid demo">
      <bp-grid-header>
        <bp-grid-column width="200">Key</bp-grid-column>
        <bp-grid-column>Function</bp-grid-column>
      </bp-grid-header>
      <bp-grid-row>
        <bp-grid-cell>Right Arrow</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus one cell to the right.</li>
            <li>If focus is on the right-most cell in the row, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Left Arrow</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus one cell to the left.</li>
            <li>If focus is on the left-most cell in the row, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Down Arrow</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus one cell down.</li>
            <li>If focus is on the bottom cell in the column, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Up Arrow</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus one cell Up.</li>
            <li>If focus is on the top cell in the column, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Page Down</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>
              Moves focus down five rows, scrolling so the bottom row in the currently visible set of rows becomes the
              first visible row.
            </li>
            <li>If focus is in the last row, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Page Up</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>
              Moves focus up 5 rows, scrolling so the top row in the currently visible set of rows becomes the last
              visible row.
            </li>
            <li>If focus is in the first row of the grid, focus does not move.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Home</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus to the first cell in the row that contains focus.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>End</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus to the last cell in the row that contains focus.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Control + Home</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus to the first cell in the first row.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
      <bp-grid-row>
        <bp-grid-cell>Control + End</bp-grid-cell>
        <bp-grid-cell>
          <ul>
            <li>Moves focus to the last cell in the last row.</li>
          </ul>
        </bp-grid-cell>
      </bp-grid-row>
    </bp-grid>
  `;
}

export function async() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/placeholder.js';
      import '@blueprintui/components/include/progress-circle.js';
    </script>
    <bp-grid aria-label="placeholder datagrid demo" height="390">
      <bp-grid-header>
        <bp-grid-column></bp-grid-column>
      </bp-grid-header>
      <bp-grid-placeholder>
        <bp-progress-circle size="xl" status="accent"></bp-progress-circle>
        <p bp-text="subsection">Loading Data...</p>
      </bp-grid-placeholder>
    </bp-grid>
  `;
}

export function rowHeader() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="row header datagrid demo">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function responsive() {
  const grid = getGrid({ columns: 5, rows: 20 })
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/column-position.js';
    </script>
    <bp-grid aria-label="responsive datagrid demo" height="480" style="width: 320px">
      <bp-grid-header>
        ${grid.columns.map((column, i) => /* html */`
        <bp-grid-column width=${i === 0 ? '120' : '200'} ${i === 0 ? 'position="fixed"' : ''}>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.map(row => /* html*/`
        <bp-grid-row>
          ${row.cells.map((cell, i) => /* html */`<bp-grid-cell ${i === 0 ? 'role="rowheader"' : ''}>${cell.value}</bp-grid-cell>`).join('\n')}
        </bp-grid-row>`).join('\n')}
    </bp-grid>
  `;
}

export function height() {
  const grid = getGrid({ columns: 4, rows: 50 })
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
    </script>
    <bp-grid aria-label="no scroll datagrid" height="390">
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

export function minHeight() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="min height datagrid" style="--body-min-height: 400px">
      <bp-grid-header>
        ${grid.columns.map(column => /* html */`<bp-grid-column>${column.label}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.slice(0, 4).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.map(cell => /* html */`<bp-grid-cell>${cell.value}</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}
      <bp-grid-footer>footer</bp-grid-footer>
    </bp-grid>
  `;
}

export function kitchenSink() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/grid/include/hover.js';
      import '@blueprintui/components/include/pagination.js';
      import '@blueprintui/components/include/input.js';
      import '@blueprintui/components/include/checkbox.js';
      import '@blueprintui/components/include/badge.js';
      import '@blueprintui/components/include/tag.js';
      import '@blueprintui/components/include/button-sort.js';
    </script>
    <bp-grid aria-label="kitchen sink datagrid" row-style="hover" height="390">
      <bp-grid-header>
        <bp-grid-column width="max-content">
          <bp-checkbox aria-label="select all"></bp-checkbox>
        </bp-grid-column>
        ${grid.columns.map((column, i) => /* html */`<bp-grid-column>${column.label} ${i === 0 ? /* html */`<bp-button-sort onClick="alert('sort')" aria-label="sort"></bp-button-sort>` : ''}</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${grid.rows.map((row, i) => /* html */`
      <bp-grid-row ${i === 2 || i === 4 ? 'selected' : ''}>
        <bp-grid-cell>
          <bp-checkbox aria-label="select row" ${i === 2 || i === 4 ? 'checked' : ''}></bp-checkbox>
        </bp-grid-cell>
        ${row.cells.map((cell, i) => /* html */`
        <bp-grid-cell>
        ${i === 1 ? /* html */`<bp-tag status="success" readonly>inactive <bp-badge status="success">1</bp-badge></bp-tag>` : cell.value}
        </bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
      <bp-grid-footer>
        <bp-pagination aria-label="pagination">
          <bp-button-icon slot="first"></bp-button-icon>
          <bp-button-icon slot="prev"></bp-button-icon>
          <bp-field novalidate>
            <bp-input type="number" value="1" size="2" min="1" max="99" aria-label="current page"></bp-input>
            <bp-field-message>/ 3</bp-field-message>
          </bp-field>
          <bp-button-icon slot="next"></bp-button-icon>
          <bp-button-icon slot="last"></bp-button-icon>
        </bp-pagination>
      </bp-grid-footer>
    </bp-grid>
  `;
}

export function dynamicPerformance() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';

      const createGrid = (rowCount) => {
        const column = document.createElement('bp-grid-column');
        const cell = document.createElement('bp-grid-cell');
        const row = document.createElement('bp-grid-row');
        const header = document.createElement('bp-grid-header');
        const grid = document.createElement('bp-grid');

        grid.rowStyle = 'border';
        grid.columnStyle = 'border';

        const columns = Array(4).fill('').map((_, i) => {
          const c = column.cloneNode();
          c.textContent = 'column ' + i;
          return c;
        });

        const rows = Array(rowCount).fill('').map((_, ri) => {
          const r = row.cloneNode();
          r.append(...Array(4).fill('').map((_, i) => {
            const c = cell.cloneNode();
            c.textContent = ri + '-' + i++;
            return c;
          }));
          return r;
        });

        header.append(...columns);
        grid.setAttribute('height', '360');
        grid.append(header, ...rows);
        return grid;
      }

      document.querySelector('#render-btn').addEventListener('click', () => {
        document.body.appendChild(createGrid(1000));
      });
    </script>
    <button id="render-btn">render</button><br /><br />
  `;
}

export function staticPerformance() {
  const grid = getGrid({ columns: 4, rows: 1000 })
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
    </script>
    <bp-grid aria-label="performance datagrid" height="390">
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

export function layerFlat() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid layer="flat" aria-label="layer flat datagrid">
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

export function layerFlatBorder() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid layer="flat" row-style="border" column-style="border" aria-label="layer flat border datagrid">
      <bp-grid-header>
        <bp-grid-column>column 1</bp-grid-column>
        <bp-grid-column>column 2</bp-grid-column>
        <bp-grid-column>column 3</bp-grid-column>
        <bp-grid-column>column 4</bp-grid-column>
      </bp-grid-header>
      
    </bp-grid>
  `;
}

export function virtualList() {
  return /* html */`
    <bp-grid aria-label="virtual list datagrid" column-style="border" row-style="border">
      <bp-grid-header>
        <bp-grid-column>column 1</bp-grid-column>
        <bp-grid-column>column 2</bp-grid-column>
        <bp-grid-column>column 3</bp-grid-column>
        <bp-grid-column>column 4</bp-grid-column>
      </bp-grid-header>
      <bp-virtual-list height="400px" item-height="48" item-count="10000"></bp-virtual-list>
      <bp-grid-footer>
        10,000 rows
      </bp-grid-footer>
      <template>
        <bp-grid-row>
          <bp-grid-cell></bp-grid-cell>
          <bp-grid-cell></bp-grid-cell>
          <bp-grid-cell></bp-grid-cell>
          <bp-grid-cell></bp-grid-cell>
        </bp-grid-row>
      </template>
    </bp-grid>
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/footer.js';
      import '@blueprintui/grid/include/keynav.js';
      import '@blueprintui/virtual/include/virtual-list.js';

      const list = Array.from({ length: 10_000 }, (_, i) => ({ id: i, name: 'Item ' + i }));
      const grid = document.querySelector('bp-grid[aria-label="virtual list datagrid"]');
      const virtualList = grid.querySelector('bp-virtual-list');
      const template = grid.querySelector('template');

      virtualList.addEventListener('bp-range-change', ({ detail: { start, end } }) => {
        virtualList.innerHTML = '';
        virtualList.append(...list.slice(start, end).map(item => {
          const row = template.content.cloneNode(true);
          row.querySelectorAll('bp-grid-cell').forEach((cell, i) => {
            cell.textContent = (i + 1) + '-' + item.id;
          });
          return row;
        }));
      });
    </script>
  `;
}