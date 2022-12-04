import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Visibility',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'column-visibility')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}