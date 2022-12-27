import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tags',
  schema: schema.find(c => c.name === 'tag')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'badges')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
