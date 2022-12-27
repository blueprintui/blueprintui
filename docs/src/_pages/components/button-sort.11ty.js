import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Button Sort',
  aria: 'https://www.w3.org/WAI/ARIA/apg/patterns/button/',
  schema: schema.find(c => c.name === 'button-sort')
};

export function render() {
  return /* markdown */`
The \`bp-button-sort\` includes the necessary accessible aria attributes for sorting features. To specify the current sorting state, set the sort attribute/property to 'ascending', 'descending', or 'none'.

${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
