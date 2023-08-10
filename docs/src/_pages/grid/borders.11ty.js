import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Borders',
  tags: [],
  schema: schema.find(c => c.name === 'cell')
}

export function render() {
  return /* markdown */`
The border styles feature allows you to customize the borders of the datagrid to match the style of your application.

${getExample(data.schema, 'row-border')}

${getExample(data.schema, 'column-border')}

${getExample(data.schema, 'border')}

${getExample(data.schema, 'no-border')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Custom borders should still allow users to easily distinguish between rows and columns.

${getAPI(data.schema)}
  `;
}