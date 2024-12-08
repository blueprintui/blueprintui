import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Icon',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-icon')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-button-icon')}

${getExample(data.schema, 'action')}

${getExample(data.schema, 'status')}

${getExample(data.schema, 'flat')}

${getExample(data.schema, 'inline')}

${getExample(data.schema, 'selected')}

${getExample(data.schema, 'pressed')}

The \`pressed\` attribute should be used for interactive UI elements that can be toggled on and off.
It provides [accessibility information](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed)
to screen reader users about the state of the control, whether it's "true" (pressed), "false" (not pressed), or "mixed".

${getExample(data.schema, 'disabled')}

The \`disabled\` attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getImport(data.schema)}

## Accessibility
- Use clear, descriptive labels for the button that communicates its purpose.
- Use aria-label or aria-labelledby to provide a text description of the icon for screen readers.
- Make sure that the icon alone still conveys its meaning when used out of context.
- Provide alternative ways for users who have difficulty seeing the icon to understand the button's function, such as by including a text label.

${getAPI(data.schema)}
`;
}
