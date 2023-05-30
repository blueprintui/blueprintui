import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Accordion',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/accordion/',
  schema: schema.find(c => c.name === 'accordion')
};

export function render() {
  return /* markdown */`
The accordion component is used to display a large amount of content in a small space. The accordion should be used to group related content together.
The titles or headings of the accordion sections should be clear and concise, describing the content that will be revealed.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive titles or headings for the accordion sections.
- Ensure keyboard navigation order is not disrupted.
- Provide an alternative way for users to access the content in the accordion sections, such as a "show all" or "expand all" button.

${getAPI(data.schema)}
`;
}
