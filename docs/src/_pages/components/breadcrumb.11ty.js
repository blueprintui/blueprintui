import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Breadcrumb',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/',
  schema: schema.find(c => c.name === 'breadcrumb')
};

export function render() {
  return /* markdown */`
Breadcrumbs are a secondary navigation tool that show the user's location within a website or web application.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
