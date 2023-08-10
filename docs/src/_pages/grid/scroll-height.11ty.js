import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Scroll Height',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
The height property controls the scroll height of the grid container. By default, the grid expands to the number of provided rows.

${getExample(data.schema, 'height')}

The minimum grid body height can be set via the \`--body-min-height\` CSS custom property.

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}