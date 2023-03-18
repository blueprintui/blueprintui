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
Using the \`border-style\` attribute or \`borderStyle\` property you can apply the following, \`none\`, \`column\`, \`row\`, or \`cell\`.

${getExample(data.schema, 'cell')}

${getExample(data.schema, 'column')}

${getExample(data.schema, 'none')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Custom borders should still allow users to easily distinguish between rows and columns.

${getAPI(data.schema)}
  `;
}