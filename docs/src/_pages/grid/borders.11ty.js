import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Borders',
  tags: [],
  schema: schema.find(c => c.name === 'cell')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'cell')}

${getExample(data.schema, 'column')}

${getExample(data.schema, 'none')}

${getExample(data.schema, 'stripe')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}