import * as cell from './cell/element.examples.js';
import * as grid from './grid/element.examples.js';
import * as column from './column/element.examples.js';
import * as row from './row/element.examples.js';
import * as footer from './footer/element.examples.js';
import * as pagination from './pagination/element.examples.js';
import * as placeholder from './placeholder/element.examples.js';

const cellExamples = Object.entries(cell).filter(([key, value]) => value instanceof Function);
const columnExamples = Object.entries(column).filter(([key, value]) => value instanceof Function);
const gridExamples = Object.entries(grid).filter(([key, value]) => value instanceof Function);
const rowExamples = Object.entries(row).filter(([key, value]) => value instanceof Function);
const footerExamples = Object.entries(footer).filter(([key, value]) => value instanceof Function);
const paginationExamples = Object.entries(pagination).filter(([key, value]) => value instanceof Function);
const placeholderExamples = Object.entries(placeholder).filter(([key, value]) => value instanceof Function);

const examples = [...cellExamples, ...columnExamples, ...gridExamples, ...rowExamples, ...footerExamples, ...paginationExamples, ...placeholderExamples];

export const metadata = {
  name: 'all',
  elements: ['bp-grid', 'bp-grid-column', 'bp-grid-row',  'bp-grid-cell', 'bp-grid-footer', 'bp-grid-pagination', 'bp-grid-placeholder']
};

export function all() {
  return /* html */`
  <script type="module">
    import '@blueprintui/grid/include/core.js';
    import '@blueprintui/grid/include/footer.js';
    import '@blueprintui/grid/include/keynav.js';
    import '@blueprintui/grid/include/pagination.js';
    import '@blueprintui/grid/include/placeholder.js';
  </script>
  <div bp-layout="grid cols:6@md cols:4@xl gap:md">
    ${examples.map(([key, value]) => {
      return `<div bp-layout="block gap:sm"><h2 bp-text="section">${key}</h2>\n${value()}</div>`;
    }).join('\n')}
  </div>
  `
}