import schema from '../../../../packages/grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Layer',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
The layer feature allows you to customize the containment style of the grid. This can be helpful for nesting grid inside other container like components.

${getExample(data.schema, 'layer-flat')}

${getExample(data.schema, 'layer-flat-border')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Ensure grid content has proper contrast level regardless of active layer.

${getAPI(data.schema)}
  `;
}