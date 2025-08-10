import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Datetime',
  schema: schema.find(c => c.name === 'format-datetime')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-format-datetime')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'time')}

${getExample(data.schema, 'text')}

${getImport(data.schema)}

## Accessibility
- Datetime formats should be localized to the user's locale. The \`locale\` attribute can be used to set the locale. If no locale is provided, the user's locale will be used.

${getAPI(data.schema)}
`;
}
