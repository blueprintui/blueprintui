import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Action Bulk',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
Row bulk actions work in a similar way to single actions, but use bp-checkbox to identify which elements the action should be applied to.

${getExample(data.schema, 'action-bulk')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}