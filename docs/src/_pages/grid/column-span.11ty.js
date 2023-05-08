import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Span',
  tags: [],
  schema: schema.find(c => c.name === 'column'),
  experimental: true
}

export function render() {
  return /* markdown */`
The datagrid column span feature allows you to create cells that span multiple columns in a datagrid.
To create a cell that spans multiple columns, set the aria-colspan attribute to indicate the number of
columns spanned by the cell, to set the position and span of the cell. Certain features are not supported
for column span such as keyboard navigation, column resizing, and column reordering.

${getExample(data.schema, 'column-span')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Use the aria-colspan attribute on the \`<bp-grid-cell>\` element within the \`<bp-grid-row>\` to indicate the number of columns spanned by the cell.

${getAPI(data.schema)}
  `;
}