import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Width',
  tags: [],
  layout: 'doc.11ty.js',
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'fixed-width')}

${getExample(data.schema, 'percentage-width')}

${getExample(data.schema, 'overflow')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}