import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Toast',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/alert/',
  schema: schema.find(c => c.name === 'toast')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-toast')}

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
