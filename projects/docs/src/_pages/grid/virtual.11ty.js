import schema from '../../../../grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Virtual List',
  tags: [],
  schema: schema.find(c => c.name === 'basic')
}

export function render() {
  return /* markdown */`
Using the \`bp-virtual-list\` component, you can create a virtual list that will only render the items that are visible in the viewport.

${getExample(data.schema, 'virtual-list')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/virtual/include/virtual-list.js'])}
  `;
}