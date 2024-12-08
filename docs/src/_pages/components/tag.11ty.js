import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tags',
  schema: schema.find(c => c.name === 'tag')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-tag')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'badges')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'links')}

${getImport(data.schema)}

### Accessibility
- The Tag component should have a descriptive \`aria-label\` or \`aria-labelledby\`.

${getAPI(data.schema)}
`;
}
