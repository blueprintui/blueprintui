import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Range Selection',
  schema: schema.find(c => c.name === 'range selection'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'range-selection')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/range-selection.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}