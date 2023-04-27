import schema from '../../../../packages/grid/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Pagination',
  tags: [],
  schema: schema.find(c => c.name === 'footer')
}

export function render() {
  return /* markdown */`
The pagination feature allows you to break up the data into multiple pages to make it easier for users to navigate through large sets of data.

${getExample(data.schema, 'pagination')}

${getExample(data.schema, 'pagination-custom')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/components/include/pagination.js'])}

## Accessibility
-  Current page and the total number of pages should be used to convey through screen readers or other assistive technologies.

${getAPI(data.schema)}
  `;
}