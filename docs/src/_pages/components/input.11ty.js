import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Input',
  schema: schema.find(c => c.name === 'input')
};

export function render() {
  return /* markdown */`
## Usage
The text input component is used to allow users to input and edit text. The text input should have a clear, descriptive label that explains what the user should enter as well as a placeholder text that gives an example of the expected input format.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The text input should have a clear and visible label.
- It should have an appropriate \`input type\` attribute.
- It should have a clear and visible focus state and be keyboard navigable.
- It should support ARIA attributes such as \`aria-describedby\` and \`aria-label\` if not visible label is provided.

${getAPI(data.schema)}
`;
}
