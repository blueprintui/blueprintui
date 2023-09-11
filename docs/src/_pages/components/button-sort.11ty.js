import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Sort',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/',
  schema: schema.find(c => c.name === 'button-sort')
};

export function render() {
  return /* markdown */`
The sort button component is used to allow users to sort a list of items by a specific criteria. It is typically used in tables, lists, or other data focused components.
The sort button should have a clear and descriptive label that communicates the criteria by which the list is sorted, such as "Sort by Name" or "Sort by Date".

${getExample(data.schema, 'example')}

${getExample(data.schema, 'disabled')}

The \`disabled\` attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'form')}

The sort button is a form control type which means it can be part of [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) in \`form\` elements.
By default the control is stateless however, if the control has a \`name\` attribute, it will be included in the form data as a stateful control indicating the current sort state.

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive labels for the button that communicates its purpose.
- Use aria-label or aria-labelledby to provide a text description of the icon for screen readers.
- Provide a way for keyboard users to interact with the button, such as by using the tab key.
- Provide clear feedback on the sorted criteria and order, such as through the use of an icon or label.

${getAPI(data.schema)}
`;
}
