import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Async',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
Conditionally render bp-grid-placeholder and bp-progress-circle to indicate that the data is loading.

${getExample(data.schema, 'async')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/placeholder.js'])}

${getAPI(data.schema)}
  `;
}