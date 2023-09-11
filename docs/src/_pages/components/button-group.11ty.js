import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Group',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-group')
};

export function render() {
  return /* html */`
The button group component is used to group together related buttons and present them as a single visual unit.
Each button in the group should have a clear and descriptive label that communicates its purpose.
The group should be labeled if the relationship between the buttons is not immediately clear.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'secondary')}

${getExample(data.schema, 'flat')}

${getExample(data.schema, 'icon')}

${getExample(data.schema, 'icon-secondary')}

${getExample(data.schema, 'icon-flat')}

${getExample(data.schema, 'selected')}

The selected attribute is used to indicate the current selected item within a group of items.
It assists screen readers by conveying which item is currently selected, [enhancing accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected).

${getExample(data.schema, 'disabled')}

The disabled attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive labels for each button that communicates its purpose.
- Use aria-label or aria-labelledby to label the group if the relationship between the buttons is not immediately clear.
- Provide a way for keyboard users to navigate through the buttons, such as by using the tab key.

${getAPI(data.schema)}
  `;
}
