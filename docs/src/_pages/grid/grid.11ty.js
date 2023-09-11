import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Data Grid',
  tags: [],
  permalink: '/docs/grid.html',
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
The Datagrid component is used to display large amounts of tabular data in a structured and organized way.
The Datagrid functions similar HTML Table Element, stateless only rendering what HTML is provided.
Interactions are managed by the host application. This provides significantly more flexibility
for patterns and statemangament in your applications.

${getExample(data.schema, 'basic')}

${getExample(data.schema, 'keynav')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Ensure that all grid functions and options, such as sorting, filtering, and pagination, are available to keyboard and screen reader users.

${getAPI(data.schema)}
`;
}