import schema from '../../../../packages/grid/.drafter/schema.json' with { type: 'json' };
import { getImport, getExample, getAPI } from '../../_includes/utils/index.js';

export const data = {
  title: 'Grid Clipboard',
  tags: [],
  schema: schema.find(c => c.name === 'clipboard'),
  experimental: true
}

export function render() {
  return /* markdown */`
The datagrid clipboard feature allows you to copy the contents of a datagrid to the clipboard. This is
useful when you want to copy the contents of a datagrid to another application or to another part of
the same application.

${getExample(data.schema, 'example')}

${getImport(['@blueprintui/grid/include/core.js', '@blueprintui/grid/include/clipboard.js'])}

${getAPI(data.schema)}
  `;
}