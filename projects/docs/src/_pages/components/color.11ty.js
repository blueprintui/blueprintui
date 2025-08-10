import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Color',
  schema: schema.find(c => c.name === 'color')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-color')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use a \`label\` element or \`aria-labelledby\` or \`aria-label\` to provide a clear and concise description of the color picker option.

${getAPI(data.schema)}
`;
}
