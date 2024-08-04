import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Breadcrumb',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
  schema: schema.find(c => c.name === 'breadcrumb')
};

export function render() {
  return /* markdown */`
The breadcrumb component is used to show the user's current location, and provides an easy way to navigate back to previous sections.
The breadcrumb displays a hierarchical navigation structure, with the current location being the last item. Each item in the breadcrumb should be a link that allows the user to navigate.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive text for each item in the breadcrumb that communicates the name of the section.
- Use appropriate color contrast to make sure the text is easily readable for users with visual impairments.
- Use aria-current attribute to indicate the current location.
- Do not prevent the default tab navigation order.

${getAPI(data.schema)}
`;
}
