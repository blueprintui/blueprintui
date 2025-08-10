import schema from '../../../..//grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Action',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
Row Actions can be applied to bp-grid-row by leveraging the bp-button-icon. The button can open a context dropdown per row to allow the user to trigger an action specific to that row.

${getExample(data.schema, 'action')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

${getAPI(data.schema)}
  `;
}