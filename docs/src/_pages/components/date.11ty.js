import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Date',
  schema: schema.find(c => c.name === 'date')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-date')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use appropriate \`label\` or \`aria-label\` and \`aria-describedby\` to provide an accessible name and description for the input.

${getAPI(data.schema)}
`;
}
