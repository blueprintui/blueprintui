import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dialog',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/',
  schema: schema.find(c => c.name === 'dialog')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-dialog')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'small')}

${getExample(data.schema, 'large')}

${getExample(data.schema, 'footer')}

${getExample(data.schema, 'non-modal')}

${getImport(data.schema)}

## Accessibility
- Provide clear and visible labels for all interactive elements, such as buttons and form fields.
- Ensure that the dialog can be navigated and operated with the keyboard, such as using the tab key to move between elements and the enter or space key to activate buttons.
- Ensure that the dialog is not the only way to access the content or functionality it provides, and that it can be closed easily by the user.

${getAPI(data.schema)}
`;
}
