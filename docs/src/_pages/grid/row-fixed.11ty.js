import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Fixed',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
A fixed position can be assigned to rows to keep them visible while scrolling. To do this, set the column to have a "fixed" position attribute.

${getExample(data.schema, 'fixed')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getAPI(data.schema)}
  `;
}