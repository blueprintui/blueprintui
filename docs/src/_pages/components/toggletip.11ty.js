import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toggletip',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/',
  schema: schema.find(c => c.name === 'toggletip')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-toggletip')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'position')}

${getImport(data.schema)}

## Accessibility
- The component should be fully navigable using only the keyboard, allowing users to easily move between different toggletip.
- The component should also provide a clear visual indication of focus for keyboard only users.

${getAPI(data.schema)}
`;
}
