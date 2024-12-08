import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Password',
  schema: schema.find(c => c.name === 'password')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-password')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The password input component should be keyboard accessible
- It should have clear and descriptive labels for accessibility screen readers
- It should have a visible focus state to indicate its interactivity

${getAPI(data.schema)}
`;
}
