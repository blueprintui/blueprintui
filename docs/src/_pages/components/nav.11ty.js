import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI, getElementSummary } from '../../_includes/utils/index.js';

export const data = {
  title: 'Nav',
  schema: schema.find(c => c.name === 'nav')
};

export function render() {
  return /* markdown */`
${getElementSummary(data.schema, 'bp-nav')}

${getExample(data.schema, 'example')}

${getExample(data.schema, 'collapsed')}

${getExample(data.schema, 'icon')}

${getExample(data.schema, 'groups')}

${getImport(data.schema)}

## Accessibility
- The currently selected page should be highlighted in the navigation menu.
- The component should be accessible to screen readers, with clear and descriptive labels for each link.
- The links should be focusable and have a clear visual indication when focused.

${getAPI(data.schema)}
`;
}
