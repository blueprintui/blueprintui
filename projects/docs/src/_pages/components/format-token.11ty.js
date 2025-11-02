import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Token',
  schema: schema.find(c => c.name === 'format-token')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-format-token')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'formats')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
