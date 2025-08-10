import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Input',
  schema: schema.find(c => c.name === 'input')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-input')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The text input should have a clear and visible label.
- It should have an appropriate \`input type\` attribute.
- It should have a clear and visible focus state and be keyboard navigable.
- It should support ARIA attributes such as \`aria-describedby\` and \`aria-label\` if not visible label is provided.

${getAPI(data.schema)}
`;
}
