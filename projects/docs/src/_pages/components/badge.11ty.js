import schema from '../../../../components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Badge',
  schema: schema.find(c => c.name === 'badge')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-badge')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'number')}

${getExample(data.schema, 'long-form')}

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive supporting text or aria-label for the badge to communicates the information it is displaying.
- Use the appropriate badge status to indicate the severity.
- Avoid using the title attribute, as it is not read by screen readers.

${getAPI(data.schema)}
`;
}
