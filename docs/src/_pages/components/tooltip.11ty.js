import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tooltip',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
  schema: schema.find(c => c.name === 'tooltip')
};

export function render() {
  return /* markdown */`
The tooltip component is used to provide additional information to the user when they hover over a specific element. It can be used to provide explanations, definitions, or supplementary information that is not critical to the main content.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'interactive')}

${getExample(data.schema, 'position')}

${getImport(data.schema)}

## Accessibility
- The component should be fully navigable using only the keyboard, allowing users to easily move between different tooltips.
- The component should also provide a clear visual indication of focus for keyboard only users.

${getAPI(data.schema)}
`;
}
