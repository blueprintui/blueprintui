import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Expand',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/switch/',
  schema: schema.find(c => c.name === 'button-expand')
};

export function render() {
  return /* markdown */`
The expand button component is used to reveal and hide additional content, such as a dropdown menu or a nested list.
The expand button should have a clear and descriptive label that communicates its purpose, such as "Expand" or "Show More".

${getExample(data.schema, 'example')}

${getExample(data.schema, 'disabled')}

${getExample(data.schema, 'readonly')}

${getExample(data.schema, 'form')}

The expand button is a form control type which means it can be part of [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) in \`form\` elements.
By default the control is stateless however, if the control has a \`name\` attribute, it will be included in the form data as a stateful boolean control indicating whether the button is expanded or not.

${getImport(data.schema)}

## Accessibility
- Use a clear, descriptive supporting text or aria-label that communicates its purpose.
- Use appropriate color contrast to make sure the text is easily readable for users with visual impairments.
- Use aria-controls to indicate the state of the expand button (open or closed) and the content it controls.
- Provide a way for keyboard users to interact with the expand button, such as by using the enter or space key.

${getAPI(data.schema)}
`;
}
