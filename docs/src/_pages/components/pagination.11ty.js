import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Pagination',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/pagination.html',
  schema: schema.find(c => c.name === 'pagination')
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'basic-pagination-number')}

${getExample(data.schema, 'first-and-last')}

${getExample(data.schema, 'editable-pagination-number')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
