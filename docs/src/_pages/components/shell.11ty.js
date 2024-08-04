import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Shell',
  schema: schema.find(c => c.name === 'shell')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getExample(data.schema, 'no-header')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
