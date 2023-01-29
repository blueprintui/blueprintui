import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dialog',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/',
  schema: schema.find(c => c.name === 'dialog')
};

export function render() {
  return /* markdown */`
The dialog component is used to display content in a overlay that appears on top of the current view. It is used to display information that requires the user's attention or interaction.
The dialog should have a clear and concise title that describes its purpose. The content of the dialog should be easy to read and understand, and should include clear call-to-action buttons.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'small')}

${getExample(data.schema, 'large')}

${getImport(data.schema)}

## Accessibility
- Provide clear and visible labels for all interactive elements, such as buttons and form fields.
- Ensure that the dialog can be navigated and operated with the keyboard, such as using the tab key to move between elements and the enter or space key to activate buttons.
- Ensure that the dialog is not the only way to access the content or functionality it provides, and that it can be closed easily by the user.

${getAPI(data.schema)}
`;
}
