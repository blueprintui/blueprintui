import schema from '../../../../packages/grid-pro/dist/drafter/schema.json';
import gridSchema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const mergedSchema = {
  ...schema.find(c => c.name === 'pro draggable columns'),
  elements: [
    ...gridSchema.find(c => c.name === 'grid').elements
  ]
};

export const data = {
  title: 'Pro Grid Draggable Columns',
  tags: [],
  schema: mergedSchema,
  pro: true
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'draggable-columns')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid-pro/include/draggable-column.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}