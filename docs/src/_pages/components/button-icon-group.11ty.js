import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Icon Group',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/',
  schema: schema.find(c => c.name === 'button-icon-group')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
