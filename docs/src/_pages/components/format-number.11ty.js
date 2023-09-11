import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Format Number',
  schema: schema.find(c => c.name === 'format-number')
};

export function render() {
  return /* markdown */`
The format-datetime component is used to display numbers in a human-readable format. The element reflects the [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) API.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'currency')}

${getExample(data.schema, 'text')}

${getImport(data.schema)}

## Accessibility
- Number formats should be localized to the user's locale. The \`locale\` attribute can be used to set the locale. If no locale is provided, the user's locale will be used.

${getAPI(data.schema)}
`;
}
