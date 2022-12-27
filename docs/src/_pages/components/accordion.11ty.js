import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Accordion',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
  schema: schema.find(c => c.name === 'accordion')
};

export function render() {
  return /* markdown */`
An accordion allows users to collapse generic content and expand it to show more detail.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
