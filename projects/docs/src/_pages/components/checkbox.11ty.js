import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Checkbox',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
  schema: schema.find(c => c.name === 'checkbox')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-checkbox')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical-group' )}

${getExample(data.schema, 'vertical-inline-group')}

${getExample(data.schema, 'horizontal-group')}

${getExample(data.schema, 'horizontal-inline-group')}

${getExample(data.schema, 'compact-group')}

${getImport(data.schema)}

## Accessibility
- Use a label to provide a clear and concise description of the checkbox option.
- Use \`aria-labelledby\` or \`aria-label\` to provide an accessible name for the checkbox for screen readers.

${getAPI(data.schema)}
`;
}
