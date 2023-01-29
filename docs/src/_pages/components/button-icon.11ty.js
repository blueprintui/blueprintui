import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Icon',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-icon')
};

export function render() {
  return /* markdown */`
The icon button component is used to provide a visual representation of an action.
The button should have a clear and descriptive label that communicates its purpose, such as "Delete" or "Add".
The icon should be easily recognizable and match the label's meaning.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'selected')}

${getExample(data.schema, 'disabled')}

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive labels for the button that communicates its purpose.
- Use aria-label or aria-labelledby to provide a text description of the icon for screen readers.
- Make sure that the icon alone still conveys its meaning when used out of context.
- Provide alternative ways for users who have difficulty seeing the icon to understand the button's function, such as by including a text label.

${getAPI(data.schema)}
`;
}
