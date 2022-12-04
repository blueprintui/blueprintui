import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Responsive',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
Provide basic support for smaller devices by leveraging fixed column positioning.
For each column, set an initial column width via the width attribute.

${getExample(data.schema, 'responsive')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}