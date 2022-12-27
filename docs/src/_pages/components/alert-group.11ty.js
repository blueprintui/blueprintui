import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Alert Group',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
  schema: schema.find(c => c.name === 'alert')
};

export function render() {
  return /* markdown */`
Alerts are messages that convey the importance of the information they contain. They grab the user's attention and provide contextually relevant information that is critical for the user to know.

${getExample(data.schema, 'alert-group',  { title: false })}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
