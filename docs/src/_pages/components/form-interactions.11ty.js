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
Icon buttons can be used to add prefix and suffix labels to form inputs, such as text fields and select boxes.

${getExample(inputSchmea, 'icons-buttons')}
Icon button can be used to add prefix and suffix icons to form inputs types. Interactive icon buttons should have \`aria-label\` attribute to provide a label for screen readers.

${getExample(inputSchmea, 'readonly')}

${getExample(inputSchmea, 'input-width')}

${getImport(data.schema)}

${getAPI(data.schema)}
  `;
}
