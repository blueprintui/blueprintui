import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Forms',
  schema: schema.find(c => c.name === 'forms')
}

export function render() {
  return /* markdown */`
Form components provide base styles and validation behavior to all the native input types.
Each form component is independently loaded.

${getImport(data.schema)}

${getExample(data.schema, 'horizontal-inline')}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'vertical')}

${getExample(data.schema, 'vertical-inline')}

${getExample(data.schema, 'compact')}

${getAPI(data.schema)}
  `;
}
