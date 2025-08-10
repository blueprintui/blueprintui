import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Visibility',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
The column visibility feature allows you to show or hide individual columns in the datagrid.
To hide columns use the \`hidden\` attribute or remove hidden columns from the DOM.

${getExample(data.schema, 'column-visibility')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Ensure to hide columnds with the \`hidden\` attribute or remove hidden columns from the DOM.

${getAPI(data.schema)}
  `;
}