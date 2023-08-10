import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Height',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
The Datagrid Row Height feature allows users to adjust the height of rows in a Datagrid. This feature is useful when users need to view more or less data in each row.

${getExample(data.schema, 'height')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Make sure that the row has sufficient space within the cell and row for readability.

${getAPI(data.schema)}
  `;
}