import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Groups',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
Rows can be organized into groups based on shared characteristics or categories using row groups. To toggle the visibility of all other rows within a particular group, add a bp-button-expand to the first row in the group.

${getExample(data.schema, 'groups')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}