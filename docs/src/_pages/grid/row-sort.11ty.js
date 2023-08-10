import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Sort',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
The datagrid row sort feature allows users to sort the rows in the datagrid in ascending
or descending order based on a selected column. This feature is useful when working
with large datasets to quickly identify patterns or outliers.

${getExample(data.schema, 'sort')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/components/include/button-sort.js'])}

## Accessibility
- Set the sort button state to ensure the underlying \`aria-sort\` attributes are updated.

${getAPI(data.schema)}
  `;
}