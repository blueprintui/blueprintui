import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Handle',
  schema: schema.find(c => c.name === 'button-handle')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-button-handle')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'disabled')}

The \`disabled\` attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive label for the button that communicates its purpose.
- Provide a way for keyboard users to interact with the button handle, such as using the enter or space key.
- Provide alternative ways for users who have difficulty using a mouse or trackpad to move the handle, such as by using the arrow keys.

${getAPI(data.schema)}
`;
}
