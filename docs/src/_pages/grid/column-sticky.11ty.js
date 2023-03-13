import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Column Sticky',
  tags: [],
  schema: schema.find(c => c.name === 'column')
}

export function render() {
  return /* markdown */`
Sticky columns behave similarly to fixed or pinned columns, as they "stick" to the viewport and remain visible while the rest of the grid is scrolled horizontally.

${getExample(data.schema, 'position-sticky')}

${getImport('@blueprintui/grid/include/core.js')}

${getAPI(data.schema)}
  `;
}