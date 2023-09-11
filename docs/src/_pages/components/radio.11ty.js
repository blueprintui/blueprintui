import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Radio',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/radiobutton/',
  schema: schema.find(c => c.name === 'radio')
};

export function render() {
  return /* markdown */`
Use the radio input component when you want the user to select a single option from a list of mutually exclusive options.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical-group' )}

${getExample(data.schema, 'vertical-inline-group')}

${getExample(data.schema, 'horizontal-group')}

${getExample(data.schema, 'horizontal-inline-group')}

${getExample(data.schema, 'compact-group')}

${getImport(data.schema)}

## Accessibility
- Ensure that each radio input option has a unique label
- Use clear and concise labels to ensure that the purpose and options of the radio input component are easily understood by screen reader users.
- Provide alternative text for the radio input component as a whole using the \`aria-label\` attribute if necessary.

${getAPI(data.schema)}
`;
}
