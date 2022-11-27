import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Card',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/card.html',
  schema: schema.find(c => c.name === 'card')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'card-content')}

${getExample(data.schema, 'card-grid')}

${getExample(data.schema, 'card-media')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
