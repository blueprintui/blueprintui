import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Header',
  schema: schema.find(c => c.name === 'header')
};

export function render() {
  return /* markdown */`
The header component is used to provide a consistent and recognizable top bar, typically containing a logo and main navigation.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- The header logo image should have alternative text for screen readers.
- The main navigation should be keyboard accessible, allowing users to navigate through the items using the tab key and activating them with the enter or space key.

${getAPI(data.schema)}
`;
}
