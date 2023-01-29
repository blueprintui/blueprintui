import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Pagination',
  schema: schema.find(c => c.name === 'pagination')
}

export function render() {
  return /* markdown */`
The Pagination component is used to navigate through a large number of pages. It allows users to easily switch between pages by clicking on page numbers or navigating to the first, previous, next, or last page.

${getExample(data.schema, 'example')}

${getExample(data.schema, 'basic-pagination-number')}

${getExample(data.schema, 'first-and-last')}

${getExample(data.schema, 'editable-pagination-number')}

${getImport(data.schema)}

## Accessibility
- The Pagination component should be keyboard accessible and support keyboard navigation.
- The Pagination buttons should have appropriate \`aria-labels\` that describe each action.

${getAPI(data.schema)}
`;
}
