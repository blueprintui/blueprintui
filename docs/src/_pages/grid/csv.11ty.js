import schema from '../../../../packages/grid/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid CSV',
  schema: schema.find(c => c.name === 'csv'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'csv-export')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/csv'])}

## Accessibility

${getAPI(data.schema)}
`;
}