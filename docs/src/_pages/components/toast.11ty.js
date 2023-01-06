import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toast',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
  schema: schema.find(c => c.name === 'toast')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'status')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
