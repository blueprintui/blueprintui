import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Number',
  schema: schema.find(c => c.name === 'number')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-number')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'prefix-suffix')}

${getExample(data.schema, 'validation')}

${getExample(data.schema, 'vertical')}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'step')}

${getExample(data.schema, 'range')}

${getImport(data.schema)}

## Accessibility
- The number input should have a clear and visible label.
- It should have a clear and visible focus state and be keyboard navigable.
- It should support ARIA attributes such as \`aria-describedby\` and \`aria-label\` if a visible label is not provided.
- Validation messages should be announced to screen readers using \`aria-describedby\`.
- When using prefix/suffix slots for units or currency symbols, ensure the information is available to screen readers.

${getAPI(data.schema)}
`;
}
