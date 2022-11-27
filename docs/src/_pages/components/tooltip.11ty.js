import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tooltip',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/tooltip.html',
  schema: schema.find(c => c.name === 'tooltip')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'position')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
