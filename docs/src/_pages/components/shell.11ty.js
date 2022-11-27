import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Shell',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/shell.html',
  schema: schema.find(c => c.name === 'shell')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'no-header')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
