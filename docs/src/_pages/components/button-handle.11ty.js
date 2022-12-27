import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Handle',
  schema: schema.find(c => c.name === 'button-handle')
};

export function render() {
  return /* markdown */`
The \`bp-button-handle\` provides an anchor/handle for users to use for drag and drop style features.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
