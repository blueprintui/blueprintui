import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

const inputSchmea = schema.find(c => c.name === 'forms')

export const data = {
  title: 'Form Validation',
  schema: schema.find(c => c.name === 'forms')
}

export function render() {
  return /* html */`
You can use the form components with any validation library or framework of your choice.
The form components sync with the [native HTML5 form validation](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) system built into the browser.

Field messages can be synced to the HTML5 form validaiton by setting the error attr with a [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState) value on a field message.
Validation can be disabled alltogether by using the \`novalidate\` attribute on the form.

${getExample(inputSchmea, 'validation')}

${getImport(data.schema)}

${getAPI(data.schema)}
  `;
}
