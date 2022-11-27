import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dropdown',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/dropdown.html',
  schema: schema.find(c => c.name === 'dropdown')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
