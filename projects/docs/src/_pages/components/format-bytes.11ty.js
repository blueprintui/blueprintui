import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Bytes',
  schema: schema.find(c => c.name === 'format-bytes')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-format-bytes')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'binary-display')}

${getExample(data.schema, 'specific-unit')}

${getExample(data.schema, 'unit-display')}

${getExample(data.schema, 'precision')}

${getExample(data.schema, 'text')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
