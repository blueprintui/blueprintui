import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Badge',
  schema: schema.find(c => c.name === 'badge')
};

export function render() {
  return /* markdown */`
The badge component is used to display a small amount of information, such as a count or status, in a compact and visually distinct way. It is often used to display notifications or unread messages.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive supporting text or aria-label for the badge to communicates the information it is displaying.
- Use the appropriate badge status to indicate the severity.
- Avoid using the title attribute, as it is not read by screen readers.

${getAPI(data.schema)}
`;
}
