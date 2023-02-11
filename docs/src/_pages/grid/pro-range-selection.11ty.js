import schema from '../../../../packages/grid-pro/dist/drafter/schema.json';
import gridSchema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const mergedSchema = {
  ...schema.find(c => c.name === 'pro range selection'),
  elements: [
    ...schema.find(c => c.name === 'pro range selection').elements,
    ...gridSchema.find(c => c.name === 'grid').elements
  ]
};

export const data = {
  title: 'Pro Grid Range Selection',
  tags: [],
  schema: mergedSchema,
  pro: true
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'range-selection')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid-pro/include/range-selection.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}