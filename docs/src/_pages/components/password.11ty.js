import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Password',
  schema: schema.find(c => c.name === 'password')
};

export function render() {
  return /* markdown */`
The password input component is used to accept password input from users. It is a text input field with a toggle button to show or hide the password.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical' )}

${getExample(data.schema, 'horizontal')}

${getExample(data.schema, 'compact')}

${getImport(data.schema)}

## Accessibility
- The password input component should be keyboard accessible
- It should have clear and descriptive labels for accessibility screen readers
- It should have a visible focus state to indicate its interactivity

${getAPI(data.schema)}
`;
}
