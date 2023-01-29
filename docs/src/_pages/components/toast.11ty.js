import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toast',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
  schema: schema.find(c => c.name === 'toast')
};

export function render() {
  return /* markdown */`
A Toast component is a notification that appears on the screen for a short period of time and provides feedback about an action performed by the user. A Toast should be used for short, non-interruptive notifications that are meant to supplement the current screen.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'status')}

${getImport(data.schema)}

## Accessibility
- The Toast component should have a clear and concise message.
- The Toast should be dismissed automatically after a short period of time, or the user can manually dismiss it.
- The Toast should be positioned in a visually distinguishable area on the screen.

${getAPI(data.schema)}
`;
}
