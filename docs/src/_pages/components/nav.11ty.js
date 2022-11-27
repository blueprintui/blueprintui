import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Nav',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/nav.html',
  schema: schema.find(c => c.name === 'nav')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'collapsed')}

${getExample(data.schema, 'icon')}

${getExample(data.schema, 'groups')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
