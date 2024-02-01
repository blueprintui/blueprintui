import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toggletip',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
  schema: schema.find(c => c.name === 'toggletip')
};

export function render() {
  return /* markdown */`
The toggletip component is used to provide explanations, definitions, or supplementary interactions for a given element. It should be used to provide additional information or actions that are not essential to the user's understanding of the content, but that may be helpful or informative.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'position')}

${getImport(data.schema)}

## Accessibility
- The component should be fully navigable using only the keyboard, allowing users to easily move between different toggletip.
- The component should also provide a clear visual indication of focus for keyboard only users.

${getAPI(data.schema)}
`;
}
