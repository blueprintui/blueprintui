import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tabs',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/',
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
