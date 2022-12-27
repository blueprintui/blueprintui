import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Badge',
  schema: schema.find(c => c.name === 'badge')
};

export function render() {
  return /* markdown */`
Badges are used to highlight a count, either by displaying it next to the element or within the element itself.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
