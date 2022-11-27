import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Accordion',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/accordion.html',
  schema: schema.find(c => c.name === 'accordion')
};

export function render() {
  return /* markdown */`
<a href="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/" bp-text="link">W3 ARIA Pattern</a>

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
