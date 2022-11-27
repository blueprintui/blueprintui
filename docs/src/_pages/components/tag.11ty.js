import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tags',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/tag.html',
  schema: schema.find(c => c.name === 'tag')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'badges')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
