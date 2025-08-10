import * as cell from './cell/element.examples.js';
import * as grid from './grid/element.examples.js';
import * as column from './column/element.examples.js';
import * as row from './row/element.examples.js';
import * as footer from './footer/element.examples.js';
import * as placeholder from './placeholder/element.examples.js';
import * as clipboard from './clipboard/element.examples.js';
import { grid as gridData } from './examples.data.js';

const cellExamples = Object.entries(cell).filter(([key, value]) => value instanceof Function);
const columnExamples = Object.entries(column).filter(([key, value]) => value instanceof Function);
const gridExamples = Object.entries(grid).filter(([key, value]) => value instanceof Function);
const rowExamples = Object.entries(row).filter(([key, value]) => value instanceof Function);
const footerExamples = Object.entries(footer).filter(([key, value]) => value instanceof Function);
const placeholderExamples = Object.entries(placeholder).filter(([key, value]) => value instanceof Function);
const clipboardExamples = Object.entries(clipboard).filter(([key, value]) => value instanceof Function);

const examples = [...cellExamples, ...columnExamples, ...gridExamples, ...rowExamples, ...footerExamples, ...placeholderExamples, ...clipboardExamples];

export const metadata = {
  name: 'grid',
  elements: ['bp-grid', 'bp-grid-column', 'bp-grid-row',  'bp-grid-cell', 'bp-grid-footer', 'bp-grid-pagination', 'bp-grid-placeholder']
};

export function all() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/column-alignment.js';
    import '@blueprintui/grid/include/column-position.js';
    import '@blueprintui/grid/include/footer.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/hover.js';
    import '@blueprintui/grid/include/placeholder.js';
    import '@blueprintui/grid/include/clipboard.js';
  </script>
  <div bp-layout="grid cols:6@md cols:4@xl gap:md">
    ${examples.filter(([key]) => key !== 'columnVisibility').map(([key, value]) => {
      return `<div bp-layout="block gap:sm"><h2 bp-text="section">${key}</h2>\n${value()}</div>`;
    }).join('\n')}
  </div>
  `
}

export function example() {
  return /* html */`
    <script type="module">
      import '@blueprintui/grid/include/core.js';
      import '@blueprintui/grid/include/keynav.js';
    </script>
    <bp-grid aria-label="example datagrid">
      <bp-grid-header>
        ${gridData.columns.slice(0, 4).map(() => /* html */`<bp-grid-column>col</bp-grid-column>`).join('\n')}
      </bp-grid-header>
      ${gridData.rows.slice(0, 3).map(row => /* html */`
      <bp-grid-row>
        ${row.cells.slice(0, 4).map(() => /* html */`<bp-grid-cell>cell</bp-grid-cell>`).join('\n')}
      </bp-grid-row>`).join('\n')}  
    </bp-grid>
  `;
}