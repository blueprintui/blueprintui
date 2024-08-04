import schema from '../../../../packages/components/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Tabs',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/',
  schema: schema.find(c => c.name === 'tabs')
};

export function render() {
  return /* markdown */`
The tabs component is used to display a group of related content in a tabbed interface. The user can switch between tabs to view different content.
The tabs component consists of a collection of tabs, where each tab represents a different piece of content. The tab label should clearly represent the content it opens.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'vertical')}

${getImport(data.schema)}

## Accessibility
- The tabs component should have a clear visual distinction between the selected and unselected tabs.
- The tabs component should be keyboard accessible, allowing users to navigate and activate tabs using the keyboard.
- The tab label should clearly represent the content it opens.

${getAPI(data.schema)}
`;
}
