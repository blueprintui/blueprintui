import schema from '../../../../packages/grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Row Stripe',
  tags: [],
  schema: schema.find(c => c.name === 'row')
}

export function render() {
  return /* markdown */`
The row stripe feature allows you to apply alternate styles to the rows in the datagrid to improve readability.
Set the \`row-style\` attribute or \`rowStyle\` property to \`stripe\` to enable the feature.

${getExample(data.schema, 'stripe')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/keynav.js'])}

## Accessibility
- Alternate row styles should still allow users to easily distinguish between rows and columns.

${getAPI(data.schema)}
  `;
}