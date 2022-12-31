import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Height',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'height')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}