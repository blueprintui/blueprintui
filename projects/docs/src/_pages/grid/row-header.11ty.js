import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Header',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
The role="rowheader" attribute can be added to any cell within a grid row. The rowheader enables a row to be labeled by the column with the set rowheader attribute. The first cell in the row type is set as the row header but this can be changed.

<div>
<bp-alert status="warning">Only the first cell in row with role="rowheader" be visually different.</bp-alert>
</div>

${getExample(data.schema, 'row-header')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getAPI(data.schema)}
  `;
}