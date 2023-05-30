import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Icon Group',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/',
  schema: schema.find(c => c.name === 'button-icon-group')
};

export function render() {
  return /* markdown */`
The icon button group component is used to group together related icon buttons. This can be useful for creating a toolbar or a set of controls for a specific feature.
Each icon button in the group should have a clear and descriptive label that communicates its purpose. The group should be labeled if the relationship between the buttons is not immediately clear.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'selected')}

The \`selected\` attribute is used to indicate the current selected item within a group of items.
It assists screen readers by conveying which item is currently selected, [enhancing accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected).

${getExample(data.schema, 'disabled')}

The \`disabled\` attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive labels for each icon button that communicates its purpose.
- Use aria-label or aria-labelledby to label the group if the relationship between the buttons is not immediately clear.
- Provide a way for keyboard users to navigate through the buttons, such as by using the tab key.
- If the group contains mutually exclusive options, use the aria-checked attribute to indicate the selected button.

${getAPI(data.schema)}
`;
}
