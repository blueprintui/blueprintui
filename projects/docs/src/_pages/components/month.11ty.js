import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Month',
  schema: schema.find(c => c.name === 'month')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-month')}

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
