import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Accordion',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
  schema: schema.find(c => c.name === 'accordion')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-accordion')}

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive titles or headings for the accordion sections.
- Ensure keyboard navigation order is not disrupted.
- Provide an alternative way for users to access the content in the accordion sections, such as a "show all" or "expand all" button.

${getAPI(data.schema)}
`;
}
