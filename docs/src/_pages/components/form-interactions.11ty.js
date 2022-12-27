import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const inputSchmea = schema.find(c => c.name === 'input')

export const data = {
  title: 'Form Interactions',
  schema: schema.find(c => c.name === 'forms')
}

export function render() {
  return /* html */`
${getExample(inputSchmea, 'prefix-suffix')}

${getExample(inputSchmea, 'icons-buttons')}

${getExample(inputSchmea, 'readonly')}

${getExample(inputSchmea, 'input-width')}

${getImport(data.schema)}

${getAPI(data.schema)}
  `;
}
