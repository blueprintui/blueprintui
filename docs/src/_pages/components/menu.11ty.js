import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Menu',
  schema: schema.find(c => c.name === 'menu')
};

export function render() {
  return /* markdown */`
The menu component provides a hierarchical view of available options, allowing users to choose from a variety of actions. Each option should have clear, descriptive text that helps the user understand what the option does.

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
