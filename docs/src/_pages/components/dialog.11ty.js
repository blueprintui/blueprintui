import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dialog',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/',
  schema: schema.find(c => c.name === 'dialog')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
