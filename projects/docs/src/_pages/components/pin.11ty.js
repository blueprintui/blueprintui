import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Pin',
  schema: schema.find(c => c.name === 'pin')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-pin')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getExample(data.schema, 'masked')}

${getExample(data.schema, 'types')}

${getExample(data.schema, 'lengths')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'custom-styling')}

${getExample(data.schema, 'events')}

${getExample(data.schema, 'form-integration')}

${getExample(data.schema, 'paste-support')}

${getImport(data.schema)}

## Accessibility
- The password input component should be keyboard accessible
- It should have clear and descriptive labels for accessibility screen readers
- It should have a visible focus state to indicate its interactivity

${getAPI(data.schema)}
`;
}
