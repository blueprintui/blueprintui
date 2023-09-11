import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Checkbox',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/',
  schema: schema.find(c => c.name === 'checkbox')
};

export function render() {
  return /* markdown */`
Checkboxes are used to select one or more options from a list. They are not intended for lists where only one option can be selected. Each checkbox can be selected independently of the others.
The checkbox should have a clear and consistent label that describes the option it represents.

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
