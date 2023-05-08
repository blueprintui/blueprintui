import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Groups',
  tags: [],
  schema: schema.find(c => c.name === 'column'),
  experimental: true
}

export function render() {
  return /* markdown */`
The datagrid column groups feature allows you to visually organize and group columns in a datagrid.
This is useful when you have a large number of columns and want to group them together to make them easier to scan.
Certain features are not supported for column groups such as keyboard navigation, column resizing, and column reordering.

${getExample(data.schema, 'column-groups')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Use the aria-colspan attribute on the \`<bp-grid-column>\` element within the \`<bp-grid-header>\` to indicate the number of columns spanned by the column group.

${getAPI(data.schema)}
  `;
}