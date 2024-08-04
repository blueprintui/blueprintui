import schema from '../../../../packages/grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Detail',
  schema: schema.find(c => c.name === 'detail'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'interactive')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/detail.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}