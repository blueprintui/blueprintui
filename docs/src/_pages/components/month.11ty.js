import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Month',
  schema: schema.find(c => c.name === 'month')
};

export function render() {
  return /* markdown */`
The month input component is used to allow the user to select a month from a dropdown menu. It is used as a replacement for traditional text input when selecting a month. The component should display the current month by default.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The component should be keyboard accessible, allowing users to select a month using only the keyboard.
- The component should provide clear and descriptive text for the selected month to improve accessibility for users with visual impairments.

${getAPI(data.schema)}
`;
}
