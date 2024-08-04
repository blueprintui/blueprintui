import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dropdown',
  schema: schema.find(c => c.name === 'dropdown')
};

export function render() {
  return /* markdown */`
The dropdown are a is a generic popup component that can be positioned relative to an anchor element.
The content of a dropdown should be clearly labeled and organized, and should be related to the context in which it is used.
Avoid using dropdowns for primary navigation, as they can be difficult to use on touch devices.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'menu')}

${getExample(data.schema, 'checkbox-group')}

${getExample(data.schema, 'radio-group')}

${getImport(data.schema)}

## Accessibility
- Use ARIA attributes such as \`aria-expanded\` and \`aria-activedescendant\` to indicate the state of the dropdown.
- Use a button or link to open and close the dropdown, rather than relying on hover or swipe gestures.

${getAPI(data.schema)}
`;
}
