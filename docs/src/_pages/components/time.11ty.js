import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Time',
  schema: schema.find(c => c.name === 'time')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-time')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Provide clear and descriptive label or \`aria-label\` attribute.
- Use proper contrast ratios to ensure that the text is easily readable against the background
- Provide clear and descriptive error messages when invalid values are entered

${getAPI(data.schema)}
`;
}
