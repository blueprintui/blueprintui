import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Sticky',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
Rows can be set to sticky positioning to keep them visible while scrolling. If multiple rows are set to sticky positioning, the subsequent sticky rows will replace the previous ones as the grid is scrolled. To set a row to sticky positioning, assign the "sticky" position attribute to its column.

${getExample(data.schema, 'sticky')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}