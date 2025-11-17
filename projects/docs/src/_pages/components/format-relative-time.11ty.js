import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Relative Time',
  schema: schema.find(c => c.name === 'format-relative-time')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-format-relative-time')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'numeric-format')}

${getExample(data.schema, 'style-variations')}

${getExample(data.schema, 'specific-unit')}

${getExample(data.schema, 'live-sync')}

${getExample(data.schema, 'future-date')}

${getExample(data.schema, 'inline-text')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
