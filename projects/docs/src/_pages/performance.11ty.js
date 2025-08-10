export const data = {
  title: 'Performance',
  tags: [],
  permalink: 'performance.html'
}

export function render() {
  return /* html */`
<script type="module">
  // import '@blueprintui/grid/include.js';

  const columnCount = 4;
  const rowCount = 1000;
  const button = document.querySelector('button');
  const demo = document.querySelector('#demo');
  button.addEventListener('click', () => createGrid(), { once: true });

  function createGrid() {
    const grid = document.createElement('bp-grid');
    const footer = document.createElement('bp-grid-footer');
    const column = document.createElement('bp-grid-column');
    const row = document.createElement('bp-grid-row');
    const cell = document.createElement('bp-grid-cell');
    grid.height = '360';
    grid.ariaLabel = 'performance demo';
    footer.innerText = 'Rows: ' + rowCount + ' Cells: ' + columnCount * rowCount; 

    const columns = [];
    const rows = [];
    for (let i = 0; i < columnCount; i++) {
      const col = column.cloneNode();
      col.innerText = 'column ' + i;
      columns.push(col);
    }

    for (let r = 0; r < rowCount; r++) {
      const rowCopy = row.cloneNode();
      for (let c = 0; c < columnCount; c++) {
        const cellCopy = cell.cloneNode();
        cellCopy.innerText = r + '-' + c;
        rowCopy.appendChild(cellCopy);
      }
      rows.push(rowCopy);
    }

    grid.append(...columns, ...rows, footer);
    demo.appendChild(grid);
  }
</script>
<style>
  :not(:defined) { display:none }

  #demo {
    margin-top: 48px;
  }
</style>
<button>show</button>
<div id="demo"></div>
`;
}
