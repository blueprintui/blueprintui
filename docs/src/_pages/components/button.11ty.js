import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button')
};

export function render() {
  return /* markdown */`
The button component should be used when the user needs to take an action. The text or icon used in the button should be clear and concise, communicating the action the button will take.

${getExample(data.schema, 'action')}

${getExample(data.schema, 'status')}

${getExample(data.schema, 'secondary')}

${getExample(data.schema, 'small')}

${getExample(data.schema, 'pressed')}

${getExample(data.schema, 'selected')}

${getExample(data.schema, 'disabled')}

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive text label for the button that communicates the action it will take. 
- Use aria-label attribute for buttons with icons to provide the text alternative for the icon.
- Ensure proper tab order for keyboard navigation.
- Avoid using complex icons or graphics that might be confusing for visually impaired users.
- Avoid using the title attribute, as it is not read by screen readers.

${getAPI(data.schema)}
`;
}
