import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Pagination',
  tags: [],
  schema: schema.find(c => c.name === 'pagination')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'pagination')}

${getExample(data.schema, 'pagination-custom')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/pagination.js'])}

${getAPI(data.schema)}
  `;
}