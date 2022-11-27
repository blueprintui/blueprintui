import schema from '../../../../packages/components/dist/drafter/schema.json';
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Dialog',
  layout: 'doc.11ty.js',
  permalink: 'docs/components/dialog.html',
  schema: schema.find(c => c.name === 'dialog')
};

export function render() {
  return /* markdown */`
${getExample(data.schema, 'example')}

${getImport(data.schema)}

${getAPI(data.schema)}
`;
}
