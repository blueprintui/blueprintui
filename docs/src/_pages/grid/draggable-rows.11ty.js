import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Draggable Rows',
  schema: schema.find(c => c.name === 'draggable rows'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'draggable-rows')}

${getExample(data.schema, 'draggable-rows-multi-grid')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/draggable-rows.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}