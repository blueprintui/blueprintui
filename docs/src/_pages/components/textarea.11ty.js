import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Textarea',
  schema: schema.find(c => c.name === 'textarea')
};

export function render() {
  return /* markdown */`
The textarea component is used to capture multi-line text input from the user.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- Use the label element or \`aria-label\` attribute to provide a label for the textarea.
- Provide a clear and descriptive placeholder attribute to give users an idea of what type of text is expected.

${getAPI(data.schema)}
`;
}
