import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Alignment',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
The column alignment feature allows you to control the alignment of the content within each column. By default, content in a datagrid is aligned to the left.
To use the column alignment feature, add the align property to the column definition object, with the value being either \`start\`, \`center\`, or \`end\`.

${getExample(data.schema, 'align-center')}

${getExample(data.schema, 'align-end')}

${getExample(data.schema, 'align-start')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- The column alignment feature should be implemented in a way that does not create confusion representing the data.
- The datagrid should have a clear, logical structure that is easy for users to navigate and understand.

${getAPI(data.schema)}
  `;
}