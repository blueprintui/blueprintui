import schema from '../../../..//components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Drawer',
  schema: schema.find(c => c.name === 'drawer')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-drawer')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'right')}

${getExample(data.schema, 'left')}

${getImport(data.schema)}

## Accessibility
- Use a button or link to open and close the drawer, rather than relying on hover or swipe gestures.

${getAPI(data.schema)}
`;
}
