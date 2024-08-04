import schema from '../../../../packages/grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Height',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
The height property controls the scroll height of the grid container. By default, the grid expands to the number of provided rows.

${getExample(data.schema, 'height')}

${getExample(data.schema, 'min-height')}

The minimum grid body height can be set via the \`--body-min-height\` CSS custom property. This is helpful for cases where the grid Height
should remain consistent even if few or no rows are present.

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}