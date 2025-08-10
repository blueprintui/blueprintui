import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Resize',
  schema: schema.find(c => c.name === 'column resize'),
  elements: schema.find(c => c.name === 'grid').elements
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'resize')}

${getExample(data.schema, 'resize-flex')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/column-resize.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}