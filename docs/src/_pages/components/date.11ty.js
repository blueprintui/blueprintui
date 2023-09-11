import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Date',
  schema: schema.find(c => c.name === 'date')
};

export function render() {
  return /* markdown */`
The date input component is used to allow users to select a date from the native browser datepicker input type.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use appropriate \`label\` or \`aria-label\` and \`aria-describedby\` to provide an accessible name and description for the input.

${getAPI(data.schema)}
`;
}
