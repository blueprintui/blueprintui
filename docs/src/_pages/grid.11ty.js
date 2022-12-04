import schema from '../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../_includes/utils/index.js';

export const data = {
  title: 'Grid',
  tags: [],
  layout: 'doc.11ty.js',
  permalink: 'grid.html',
  schema: schema.find(c => c.name === 'basic'),
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/grid/'
}

export function render() {
  return /* markdown */`
The Datagrid functions similar HTML Table Element, stateless only rendering what HTML is provided.
Interactions are managed by the host application. This provides significantly more flexibility
for patterns and statemangament in your applications.

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getExample(data.schema, 'basic')}

${getExample(data.schema, 'keynav')}

${getAPI(data.schema)}
`;
}