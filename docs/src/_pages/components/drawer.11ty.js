import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Drawer',
  schema: schema.find(c => c.name === 'drawer')
};

export function render() {
  return /* markdown */`
The drawer component is used to provide a hidden off-screen section that can be revealed by the user. It is commonly used to provide additional navigation or content that is not immediately necessary, but can be easily accessed when needed.
The content of a drawer should be clearly organized and labeled, and should be related to the main content of the page.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'right')}

${getExample(data.schema, 'left')}

${getImport(data.schema)}

## Accessibility
- Use a button or link to open and close the drawer, rather than relying on hover or swipe gestures.

${getAPI(data.schema)}
`;
}
