import schema from '../../../../packages/grid-pro/dist/drafter/schema.json';
import gridSchema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const mergedSchema = {
  ...schema.find(c => c.name === 'pro column resize'),
  elements: [
    ...gridSchema.find(c => c.name === 'grid').elements
  ]
};

export const data = {
  title: 'Pro Grid Column Resize',
  tags: [],
  schema: mergedSchema,
  pro: true
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'resize')}

${getExample(data.schema, 'resize-flex')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid-pro/include/column-resize.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}