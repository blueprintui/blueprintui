import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Alert',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
  schema: schema.find(c => c.name === 'alert')
};

export function render() {
  return /* markdown */`
The alert component is used to inform users of important information or to provide feedback on an action they have taken.
The component should be placed near the relevant content or form element it is associated with. The content of the alert should be clear, concise, and actionable.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive text for the alert message that communicates the purpose of the alert.
- Use the appropriate alert status to indicate the severity of the alert.
- Use aria-live attribute to indicate the importance and relevance of the alert message.
- Provide an option for user to dismiss the alert, if applicable.
- Avoid using the title attribute, as it is not read by screen readers.

${getAPI(data.schema)}
`;
}
