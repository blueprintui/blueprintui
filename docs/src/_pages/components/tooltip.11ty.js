import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tooltip',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
  schema: schema.find(c => c.name === 'tooltip')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'interactive')}

${getExample(data.schema, 'position')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
