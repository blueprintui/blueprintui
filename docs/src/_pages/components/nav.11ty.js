import schema from '../../../../packages/components/dist/drafter/schema.json' assert { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Nav',
  schema: schema.find(c => c.name === 'nav')
};

export function render() {
  return /* markdown */`
The Navigation component that allows users to navigate between different sections or pages. The component should contain links to different sections or pages within the application. The links should be clearly labeled and easily distinguishable.
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
