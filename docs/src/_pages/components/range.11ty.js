import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Range',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/slider/',
  schema: schema.find(c => c.name === 'range')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
