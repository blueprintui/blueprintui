import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Single Select',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
The Datagrid Row Single Select feature allows users to select a single row in a Datagrid at a time.
This feature is useful when users need to perform actions on a single row, such as editing or deleting it.

To use this feature, a radio button is added to each row in the Datagrid. The user can
then select a single row by clicking on the radio button next to the desired row.

${getExample(data.schema, 'single-select')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Ensure that the radio buttons have a descriptive \`aria-label\` that explain what they are for.
- Allow users to select rows using the keyboard, not just the mouse.

${getAPI(data.schema)}
  `;
}