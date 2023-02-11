import schema from '../../../../packages/grid-pro/dist/drafter/schema.json';
import gridSchema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const mergedSchema = {
  ...schema.find(c => c.name === 'pro detail'),
  elements: [
    ...schema.find(c => c.name === 'pro detail').elements,
    ...gridSchema.find(c => c.name === 'grid').elements
  ]
};

export const data = {
  title: 'Pro Grid Detail',
  tags: [],
  schema: mergedSchema,
  pro: true
}

export function render() {
  return /* markdown */`
${getExample(data.schema, 'interactive')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid-pro/include/detail.js'])}

## Accessibility

${getAPI(data.schema)}
`;
}