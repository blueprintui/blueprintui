import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Progress Circle',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/progress-circle.html',
  schema: schema.find(c => c.name === 'progress-circle')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'progress-circle-loading')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
