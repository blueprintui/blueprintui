import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Number',
  schema: schema.find(c => c.name === 'format-number')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-format-number')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'currency')}

${getExample(data.schema, 'text')}

${getImport(data.schema)}

## Accessibility
- Number formats should be localized to the user's locale. The \`locale\` attribute can be used to set the locale. If no locale is provided, the user's locale will be used.

${getAPI(data.schema)}
`;
}
