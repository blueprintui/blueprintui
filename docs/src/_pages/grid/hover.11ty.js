import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Hover',
  tags: [],
  schema: schema.find(c => c.name === 'cell')
}

export function render() {
  return /* markdown */`
The hover styles feature allows you to customize the hover effects for columns and rows of the datagrid.

${getExample(data.schema, 'row-hover')}

${getExample(data.schema, 'column-hover')}

${getExample(data.schema, 'hover')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Custom hover effects should still allow users to easily distinguish between rows and columns.

${getAPI(data.schema)}
  `;
}