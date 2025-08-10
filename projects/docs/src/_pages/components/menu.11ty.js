import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Menu',
  schema: schema.find(c => c.name === 'menu')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-menu')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'badge')}

${getExample(data.schema, 'links')}

${getExample(data.schema, 'dropdown')}

${getImport(data.schema)}

## Accessibility
- Keyboard navigation should be provided, allowing users to move through the options with the arrow keys and activate an option with the enter key.
- Provide visual cues such as hover styles to indicate when an option is focused by the keyboard or mouse.

${getAPI(data.schema)}
`;
}
