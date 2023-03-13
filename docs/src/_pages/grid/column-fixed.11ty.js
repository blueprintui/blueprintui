import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Fixed',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
Columns can be fixed in place to prevent them from scrolling horizontally with the rest of the grid. To do this, assign the "fixed" position attribute to the column.

${getExample(data.schema, 'position-fixed')}

${getExample(data.schema, 'position-multi-fixed')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}