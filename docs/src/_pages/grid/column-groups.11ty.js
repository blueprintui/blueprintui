import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Groups',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
<bp-alert-group status="warning">
  <bp-alert>
    <bp-icon shape="flask" type="solid" slot="icon"></bp-icon>
    Experimental: work in progress with no guarantees of API stability
  </bp-alert>
</bp-alert-group>

The datagrid column groups feature allows you to visually organize and group columns in a datagrid.
This is useful when you have a large number of columns and want to group them together to make them easier to scan.
Certain features are not supported for column groups such as keyboard navigation, column resizing, and column reordering.

${getExample(data.schema, 'column-groups')}

${getImport('@blueprintui/grid/include/core.js')}

## Accessibility
- Use the aria-colspan attribute on the \`<bp-grid-column>\` element within the \`<bp-grid-header>\` to indicate the number of columns spanned by the column group.

${getAPI(data.schema)}
  `;
}