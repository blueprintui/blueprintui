import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Width',
  tags: [],
  layout: 'doc.11ty.js',
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
The column width feature allows you to customize the width of individual columns in the datagrid.
To use the column width feature, set the \`width\` attribute or \`width\` property to a number or string.

${getExample(data.schema, 'fixed-width')}

${getExample(data.schema, 'percentage-width')}

${getExample(data.schema, 'overflow')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Width adjustments should still allow users to easily read and navigate the content in the datagrid.

${getAPI(data.schema)}
  `;
}