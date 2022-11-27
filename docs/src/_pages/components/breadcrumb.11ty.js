import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Breadcrumb',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/breadcrumb.html',
  schema: schema.find(c => c.name === 'breadcrumb')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
