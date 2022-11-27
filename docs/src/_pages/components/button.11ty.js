import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/button.html',
  schema: schema.find(c => c.name === 'button')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'outline')}

${getExample(data.schema, 'small')}

${getExample(data.schema, 'small-outline')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
