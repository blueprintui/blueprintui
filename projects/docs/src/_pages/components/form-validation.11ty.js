import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
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

## Validation Types

The following HTML5 validation types are supported:

- **valueMissing** - Triggered when a required field is empty
- **patternMismatch** - Triggered when input doesn't match the specified pattern
- **typeMismatch** - Triggered when input doesn't match the expected type (e.g., email, url)
- **rangeOverflow** - Triggered when a number exceeds the max value
- **rangeUnderflow** - Triggered when a number is below the min value
- **stepMismatch** - Triggered when a number doesn't match the step increment
- **tooShort** - Triggered when text is shorter than minlength
- **tooLong** - Triggered when text is longer than maxlength
- **customError** - Triggered by custom validation using \`setCustomValidity()\`
- **badInput** - Triggered when the browser cannot convert the input

${getExample(inputSchmea, 'validation')}

${getImport(data.schema)}

${getAPI(data.schema)}
  `;
}
