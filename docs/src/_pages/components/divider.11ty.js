import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Divider',
  schema: schema.find(c => c.name === 'divider')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-divider')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical')}

${getImport(data.schema)}

## Accessibility
- Avoid using divider as the only way to indicate a change in content or context.

${getAPI(data.schema)}
`;
}
