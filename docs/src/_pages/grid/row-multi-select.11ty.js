import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Multi Select',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
The Datagrid Row Multi-Select feature allows users to select multiple rows in a Datagrid at once.
This feature is especially useful when users want to perform bulk actions on a set of rows.
To use this feature, a checkbox is added to each row in the Datagrid.

${getExample(data.schema, 'multi-select')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Ensure that the checkboxes have descriptive \`aria-labels\` that explain what they are for.
- Allow users to select rows using the keyboard, not just the mouse.

${getAPI(data.schema)}
  `;
}