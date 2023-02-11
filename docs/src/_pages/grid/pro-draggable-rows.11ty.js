import schema from '../../../../packages/grid-pro/dist/drafter/schema.json';
import gridSchema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const mergedSchema = {
  ...schema.find(c => c.name === 'pro draggable rows'),
  elements: [
    ...gridSchema.find(c => c.name === 'grid').elements
  ]
};

export const data = {
  title: 'Pro Grid Draggable Rows',
  tags: [],
  schema: mergedSchema,
  pro: true
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'draggable-rows')}

${getExample(data.schema, 'draggable-rows-multi-grid')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid-pro/include/draggable-rows.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}