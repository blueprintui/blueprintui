import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Placeholder',
  tags: [],
  schema: schema.find(c => c.name === 'placeholder')
}

export function render() {
  return /* markdown */`
The placeholder is used for when all row items can no longer be displayed.

${getExample(data.schema, 'placeholder')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/placeholder.js'])}

${getAPI(data.schema)}
  `;
}