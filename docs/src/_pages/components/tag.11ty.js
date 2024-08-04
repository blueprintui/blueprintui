import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tags',
  schema: schema.find(c => c.name === 'tag')
};

export function render() {
  return /* markdown */`
The tag component is used to display labels or categories of information. It can be used to group and categorize similar items, or to label content with a certain type or status.
The tag component should contain text that is short, concise, and relevant to the content it labels. Avoid using overly long text or irrelevant information. 

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
