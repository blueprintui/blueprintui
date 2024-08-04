import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Search',
  schema: schema.find(c => c.name === 'search')
};

export function render() {
  return /* markdown */`
The Search component is used for searching for specific content within an application.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The search component should have an accessible label or \`aria-label\` attribute if no visible label is present.
- The search component should support keyboard-triggered actions, such as submitting the search query when the "Enter" key is pressed.
- The search component should provide clear feedback to users when their input is invalid, such as providing an error message or visual indication.

${getAPI(data.schema)}
`;
}
