import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Draggable Columns',
  schema: schema.find(c => c.name === 'draggable columns'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'draggable-columns')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/draggable-column.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}