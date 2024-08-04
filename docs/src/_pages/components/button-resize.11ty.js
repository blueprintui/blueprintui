import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Resize',
  schema: schema.find(c => c.name === 'button-resize')
};

export function render() {
  return /* markdown */`
The resize button component is used to act as a drag handle to resize an element.
Key navigation is supported and the step value can be used to adjust the amount of change when using the arrow keys.
The component should have a clear and descriptive label that communicates its purpose, such as "Resize Panel" or "Resize Column".

${getExample(data.schema, 'example')}

${getExample(data.schema, 'disabled')}

The \`disabled\` attribute should be used for UI elements that are currently disabled, making them uninteractive.
This attribute informs [assistive technologies](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) like screen readers that the element, while present in the document
structure, is not usable or cannot be interacted with in its current state.

${getExample(data.schema, 'split')}

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive label for the button that communicates its purpose.
- Provide a way for keyboard users to interact with the resize button.
- Provide alternative ways for users who have difficulty using a mouse or trackpad to move the handle, such as by using the arrow keys.

${getAPI(data.schema)}
`;
}
