import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tabs',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/tabs.html',
  schema: schema.find(c => c.name === 'tabs')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
